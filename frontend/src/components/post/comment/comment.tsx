import React, { useMemo, useRef, useState } from 'react'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { IComment } from '@/interfaces/IComment'
import { useDeleteCommentMutation, useEditCommentMutation } from '@/redux/reducers/post/post.api'


const Comment = ({ id, edited, message, user }: IComment) => {

  const { setError } = useAction()
  const [isEdit, setIsEdit] = useState(false)
  const messageRef = useRef<HTMLDivElement>(null)

  const [editComment] = useEditCommentMutation()
  const [deleteComment] = useDeleteCommentMutation()

  const { id: userId } = useTypedSelector((state) => state.userState)

  function editMessage() {
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

    editComment({
      commentId: id,
      message: message as string,
    })

  }

  function switchEditStatus() {

    if (isEdit) {
      setIsEdit(false)
      editMessage()
    } else {
      setIsEdit(true)
    }
  }

  function onDeleteComment() {
    deleteComment({
      commentId: id
    })
  }

  const isAuthor = useMemo(() => userId === user.id, [])

  return (
    <li style={{ 'border': '1px solid black' }}>
      {edited ? <small>edited</small> : ''}
      {
        isAuthor ?
          <div>
            <button onClick={switchEditStatus}>{isEdit ? 'save' : 'edit'}</button>
            <button onClick={onDeleteComment}>delete</button>
          </div>
          : ""
      }
      <h3>{user.email}</h3>
      <p className='new-line' ref={messageRef} contentEditable={isEdit} suppressContentEditableWarning={true}>{message}</p>
    </li>
  )
}

export default Comment