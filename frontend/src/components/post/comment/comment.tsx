import AlertMessage from '@/components/UI/Alert/Alert'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import React from 'react'
import CommentForm from './commentForm'
import CommentList from './commentList'

interface Props {}

const comment = (props: Props) => {

  const { post } = useTypedSelector(state => state.postState)

  return (
    <div>
      <h2>Comments {post?.comments.length}</h2>
      <AlertMessage timeout={5000} />
      <CommentForm />
      <CommentList/>
    </div>
  )
}

export default comment