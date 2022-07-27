import AlertMessage from '@/components/UI/Alert/Alert'
import React from 'react'
import CommentForm from './commentForm'

interface Props {}

const comment = (props: Props) => {

  return (
    <div>
      <h2>Comments 3</h2>
      <AlertMessage timeout={5000} />
      <CommentForm />
      <ul>
        <li>
          <small>editabled</small>
          <h3>Login</h3>
          <p>Content</p>
        </li>
        <li>
          <h3>Login</h3>
          <p>Content</p>
        </li>
        <li>
          <h3>Login</h3>
          <p>Content</p>
        </li>
      </ul>
    </div>
  )
}

export default comment