import TextInput from '@/components/UI/input/textInput'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useAddCommentMutation } from '@/redux/reducers/post/post.api'
import { useFormik } from 'formik'
import React, { useEffect, useRef } from 'react'
import * as yup from 'yup'


const CommentForm = () => {

  const { setError } = useAction()
  const messageRef = useRef<HTMLDivElement>(null)

  const { post } = useTypedSelector(state => state.postState)


  const [addComment] = useAddCommentMutation()

  function onSubmit(e: any) {
    e.preventDefault()

    if (messageRef.current === null) {
      setError({
        message: 'Undefined error',
        type: 'error'
      })
      return
    }

    const message = messageRef.current.textContent

    if (message!.length <= 0) {
      setError({
        message: 'Comment is required',
        type: 'error'
      })
      return
    }


    addComment({
      postId: post!.id,
      message: message as string,
    })

  } 


return (
  <form onSubmit={onSubmit}>
    <div ref={messageRef} style={{ 'whiteSpace': 'pre', 'height': '200px', 'maxHeight': '300px', 'overflow': 'auto', 'border': '1px solid black' }} contentEditable></div>
    <button className="btn auth__btn" type="submit" disabled={false}>
      Send
    </button>
  </form>
)
}

export default CommentForm