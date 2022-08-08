import AlertMessage from '@/components/UI/Alert/Alert'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import React from 'react'
import CommentForm from './commentForm'
import CommentList from './commentList'

interface Props {}

const Comments = (props: Props) => {

  const { post } = useTypedSelector(state => state.postState)

  return (
    <>
      <h2 className='comments__title'>Comments: {post?.comments.length}</h2>
      <AlertMessage timeout={5000} />
      <CommentForm />
      <CommentList/>
    </>
  )
}

export default Comments