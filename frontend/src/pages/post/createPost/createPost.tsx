import { FormEvent, useEffect, useRef, useState } from "react";

import React from 'react';
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useHistory } from "react-router-dom";
import TextInput from '@/components/UI/input/textInput';
import "./createPost.scss"
import * as yup from 'yup'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useFormik } from "formik";
import { useAction } from "@/hooks/useAction";
import AlertMessage from "@/components/UI/Alert/Alert";
import { useCreatePostMutation } from "@/redux/reducers/post/post.api";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { ApiError } from "@/redux/interfaces/ApiError";

const CreatePost: React.FC = () => {



  const [body, setBody] = useState<any>('')
  const fileImg = useRef<HTMLImageElement>(null)
  const [file, setFile] = useState<any>()

  const { id } = useTypedSelector(state => state.userState)

  const [createPost, { data, isError, error }] = useCreatePostMutation()

  const sendPostData = (values: { title: string }) => {
    if (file === undefined) {
      setError({
        message: 'File is required',
        type: 'error'
      })
      return
    }

    const postBody = draftToHtml(convertToRaw(body.getCurrentContent()))
    if (postBody.length <= 0) {
      setError({
        message: 'post body is required',
        type: 'error'
      })
      return
    }


    const formData = new FormData();
    formData.append('file', file)
    formData.append('author', id)
    formData.append('title', values.title)
    formData.append('body', postBody)
    createPost(formData)





    //createPost(title, body, id, history)

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
    console.log('data', data)
  }, [data])

  useEffect(() => {
    if (error !== undefined) {
      setError({
        message: (error as ApiError).data.message,
        type: 'error'
      })
    }
  }, [error])

  return (
    <section className="create-post-container">
      <AlertMessage timeout={5000} />
      <form className="create-post__wrapper" onSubmit={formikForm.handleSubmit}>
        <TextInput
          title="Title"
          name="title"
          id="title"
          letters={30}
          type="text"
          value={formikForm.values.title}
          setValue={formikForm.handleChange}
        />
        <input type="file" name="file" onChange={uploadImg} />
        <img ref={fileImg} />
        <Editor
          editorState={body}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={setBody}
        />
        <button type="submit" className="btn create-post__create" disabled={!formikForm.dirty}>Create post</button>
      </form>
    </section>
  );
};

export default CreatePost;


