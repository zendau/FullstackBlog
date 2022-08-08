import React, { useMemo, useRef, useState } from 'react'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { IComment } from '@/interfaces/IComment'
import { useDeleteCommentMutation, useEditCommentMutation } from '@/redux/reducers/post/post.api'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

import "./comment.scss"

const Comment = ({ id, edited, message, user }: IComment) => {

  const { setAlert } = useAction()
  const [isEdit, setIsEdit] = useState(false)
  const messageRef = useRef<HTMLDivElement>(null)

  const [editComment] = useEditCommentMutation()
  const [deleteComment] = useDeleteCommentMutation()

  const { id: userId } = useTypedSelector((state) => state.userState)

  function editMessage() {
    if (messageRef.current === null) {
      setAlert({
        message: 'Undefined error',
        type: 'error'
      })
      return
    }

    const message = messageRef.current.textContent

    if (message!.length <= 0) {
      setAlert({
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
    <li className='comment__item'>
      <div className='comment__header'>
        <h3>{user.email}</h3>
        {
          isAuthor ?
            <div className='comment__toolbar'>
              
              <button onClick={switchEditStatus}>{isEdit ? <FontAwesomeIcon icon={faSave} /> : <FontAwesomeIcon icon={faEdit} />}</button>
              <button onClick={onDeleteComment}><FontAwesomeIcon icon={faTrash} /></button>
              {edited ? <small>Edited</small> : ''}
            </div>
            : ""
        }
        
      </div>


      <p className='comment__body' ref={messageRef} contentEditable={isEdit} suppressContentEditableWarning={true}>{message}</p>
    </li>
  )
}

export default Comment