import { useTypedSelector } from '@/hooks/useTypedSelector'
import React from 'react'
import Comment from './comment'
import "./comment.scss"

const CommentList = () => {

  const { post } = useTypedSelector(state => state.postState)

  if (post?.comments === undefined || post?.comments.length === 0) {
    return (<div>No have comment yet</div>)
  }

  return (
    <ul className='comments__container'>
      {post.comments.map((comment) =>
        <Comment key={comment.id} id={comment.id} edited={comment.edited} message={comment.message} user={comment.user} />
      )}
    </ul>
  )
}

export default CommentList