import React from 'react'
import { Link } from 'react-router-dom'
import { ICommentList } from '@/interfaces/ICommentList'

interface Props {
  comments: ICommentList[]
}

const Comments = ({ comments }: Props) => {
  return (
    <ul>
      {
        comments.map((comment) =>
          <li key={comment.id} style={{ 'border': '1px solid black' }}>
            <Link to={`/post/${comment.postId}`}>
              <h3>{comment.postTitle}</h3>
              <p>{comment.message}</p>
            </Link>
          </li>
        )
      }
    </ul>
  )
}

export default Comments