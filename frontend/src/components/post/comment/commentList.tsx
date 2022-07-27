import { useTypedSelector } from '@/hooks/useTypedSelector'
import React, { useState } from 'react'
import Comment from './comment'

type Props = {}

const CommentList = (props: Props) => {

  const { post } = useTypedSelector(state => state.postState)


  console.log('post', post!.comments)
  return (
    <ul>
      {post?.comments.map((comment) =>
        <Comment key={comment.id} id={comment.id} edited={comment.edited} message={comment.message} user={comment.user} />
      )}
    </ul>
  )
}

export default CommentList