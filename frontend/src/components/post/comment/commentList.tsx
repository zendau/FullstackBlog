import { useTypedSelector } from '@/hooks/useTypedSelector'
import React from 'react'
import Comment from './comment'

type Props = {}

const CommentList = (props: Props) => {

  const { post } = useTypedSelector(state => state.postState)

  if (post?.comments === undefined || post?.comments.length === 0) {
    return (<div>No have comment yet</div>)
  }

  return (
    <ul>
      {post.comments.map((comment) =>
        <Comment key={comment.id} id={comment.id} edited={comment.edited} message={comment.message} user={comment.user} />
      )}
    </ul>
  )
}

export default CommentList