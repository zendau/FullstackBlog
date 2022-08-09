import React from 'react'
import { Link } from 'react-router-dom'
import { ICommentList } from '@/interfaces/ICommentList'

import '@/components/post/comment/comment.scss'

interface Props {
  comments: ICommentList[]
}

const Comments = ({ comments }: Props) => {

  if (comments.length > 0) {
    return (
      <>
        <h2 className='comments__title--second'>Comments: {comments.length}</h2>
        <ul className='comments__list' >
          {
            comments.map((comment) =>
              <li key={comment.id} className='comment__item'>
                <Link className='comment__link' to={`/post/${comment.postId}`}>
                  <h3 className='comment__title' >{comment.postTitle}</h3>
                </Link>
                <p className='comment__body'>{comment.message}</p>
              </li>
            )
          }
        </ul>
      </>
    )
  }

  return (
    <h3 className='comments__empty' >This user has no comments yet</h3>
  )
}

export default Comments