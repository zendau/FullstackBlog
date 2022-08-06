import React, { useEffect, useRef, useState } from 'react';
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useHistory } from "react-router-dom";
import TextInput from '@/components/UI/input/textInput';
import * as yup from 'yup'
import { Editor } from "react-draft-wysiwyg";
import { useFormik } from "formik";
import { useAction } from "@/hooks/useAction";
import AlertMessage from "@/components/UI/Alert/Alert";
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { ApiError } from "@/interfaces/api/ApiError";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./postEditor.scss"
import htmlToDraft from 'html-to-draftjs';

interface Props {
  savePostRequest: () => any
  isCreate: boolean
}

const PostEditor = ({ savePostRequest, isCreate }: Props) => {
  const [body, setBody] = useState(() => EditorState.createEmpty())
  const fileImg = useRef<HTMLImageElement>(null)
  const [file, setFile] = useState<any>()

  const { post } = useTypedSelector(state => state.postState)

  const [savePost, { data, error }] = savePostRequest()

  const history = useHistory()

  const sendPostData = (values: { title: string }) => {


    const postBody = draftToHtml(convertToRaw(body.getCurrentContent()))
    if (postBody.length <= 0) {
      setError({
        message: 'post body is required',
        type: 'error'
      })
      return
    }


    const formData = new FormData();
    formData.append('title', values.title)
    formData.append('body', postBody)

    if (!isCreate) {
      formData.append('postId', post!.id)
    }

    if (file === undefined && isCreate) {
      setError({
        message: 'File is required',
        type: 'error'
      })
      return
    } else if (file !== undefined) {
      formData.append('file', file)
    }


    savePost(formData)


  }

  function uploadImg(e: any) {
    if (fileImg.current !== null) {

      const fileData = e.target.files[0]
      setFile(fileData)
      fileImg.current.src = URL.createObjectURL(fileData)
    }
  }


  const { setError } = useAction()

  const schema = yup.object({
    title: yup.string().required().min(6),
  })

  const formikForm = useFormik({
    initialValues: {
      title: ''
    },
    onSubmit: sendPostData,
    validationSchema: schema
  })

  useEffect(() => {

    if (formikForm.isSubmitting && formikForm.errors) {

      const errors: string = Object.values(formikForm.errors).map((value) => `<span>${value}</span>`).join('')

      setError({
        message: errors,
        type: 'error'
      })
    }

  }, [formikForm.isSubmitting])

  useEffect(() => {
    if (data && 'id' in data) {
      history.push({
        pathname: `/post/${data.id}`,
        state: data
      })
    }

  }, [data])

  useEffect(() => {
    if (error !== undefined) {
      setError({
        message: (error as ApiError).data.message,
        type: 'error'
      })
    }
  }, [error])

  useEffect(() => {
    if (!isCreate && post !== null) {

      const html = post.body;
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setBody(editorState)

      }

      formikForm.initialValues.title = post.title

      if (fileImg.current !== null) {

        fileImg.current.src = `${import.meta.env.VITE_API_URL}/image/${post.file.fileName}`
      }
    }


  }, [post])

  return (
    <section className="post-editor__container">
      <AlertMessage timeout={5000} />
      <form className="post-editor__wrapper" onSubmit={formikForm.handleSubmit}>
        <TextInput
          title="Title"
          name="title"
          id="title"
          letters={30}
          type="text"
          value={formikForm.values.title}
          setValue={formikForm.handleChange}
        />
        <input type="file" name="file" onChange={uploadImg} accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*" />
        <img ref={fileImg}  />
        <Editor
          editorState={body}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={setBody}
        />
        <button type="submit" className="btn post-editor__create" disabled={!formikForm.dirty}>
          {isCreate ? 'Create post' : 'Edit post'}
        </button>
      </form>
    </section>
  );
}

export default PostEditor;