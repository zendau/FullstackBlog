import { useTypedSelector } from '@/hooks/useTypedSelector'
import React from 'react'

type Props = {}

const CommentList = (props: Props) => {

  const { post } = useTypedSelector(state => state.postState)
  console.log('post', post!.comments)
  return (
    <ul>
      test
      {post?.comments.map((comment) =>  
        <li key={comment.id}>
          { comment.edited ? <small>edited</small>: ''} 
          <h3>{comment.user.email}</h3>
          <p>{comment.message}</p>
        </li>
      )}
    </ul>
  )
}

export default CommentList