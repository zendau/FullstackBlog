import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useAddCommentMutation } from '@/redux/reducers/post/post.api'
import React, { useRef } from 'react'

import './comment.scss'

const CommentForm = () => {

  const { setAlert } = useAction()
  const messageRef = useRef<HTMLDivElement>(null)

  const { post } = useTypedSelector(state => state.postState)

  const [addComment] = useAddCommentMutation()

  function onSubmit(e: any) {
    e.preventDefault()

    if (messageRef.current === null) {
      setAlert({
        message: 'Undefined error',
        type: 'error'
      })
      return
    }

    const message = messageRef.current.textContent
    messageRef.current.textContent = ''
    if (message!.length <= 0) {
      setAlert({
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
    <div ref={messageRef} className='comment__form' contentEditable></div>
    <button className="btn auth__btn comment__btn" type="submit" disabled={false}>
      Send comment
    </button>
  </form>
)
}

export default CommentForm