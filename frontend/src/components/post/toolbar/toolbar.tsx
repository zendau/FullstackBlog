import { useDeletePostMutation } from '@/redux/reducers/post/post.api'
import React, { useMemo } from 'react'
import { Link, useHistory } from 'react-router-dom'

interface Props {
  userId: string
  postId: string
  postIdAuthor: string
}

const PostToolbar = ({ userId, postId, postIdAuthor}: Props) => {

  const checkStatus = useMemo(() => userId === postIdAuthor, [userId, postIdAuthor])

  const [deletePost] = useDeletePostMutation()
  const history = useHistory()

  function onClickDeletePost() {
    deletePost(postId)
    history.push('/post/all')
  }

  return (
    <>
      {
        checkStatus ?
          <div className="read-post__btn-container">
            <Link className="btn read-post__edit" to={"/post/edit/" + postId}>Edit post</Link>
            <button className="btn read-post__delete" onClick={onClickDeletePost}>Delete post</button>
          </div> :
          ""
      }
    </>
  )
}

export default PostToolbar