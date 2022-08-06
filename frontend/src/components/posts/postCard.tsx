import { usePostObserver } from '@/hooks/usePostObserver'
import { IPost } from '@/interfaces/IPost'
import { dateFormat } from '@/utils/dateFormat'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  postData: IPost,
  isLast: boolean
}

const PostCard = memo(({ postData, isLast }: Props) => {

  function createPostPreview(body: string) {
    const previewLimit = 250
  
    if (body.length < previewLimit) {
      return body 
    } 
  
    return `${body.substring(0, previewLimit)}...`
  }

  const observerCallback = usePostObserver()

  return (
    <div key={postData.id} className="post">
      {
        isLast ?
          <div ref={observerCallback}></div>
          : ""
      }
      <div className="post__header">
        <h2 className="post__title">{postData.title}</h2>
        <small>{dateFormat(postData.date)}</small>
        <p className="post__body" dangerouslySetInnerHTML={{ __html: createPostPreview(postData.body) }}></p>
      </div>
      <div className="post__footer">
        <Link to={`/post/${postData.id}`} className="btn post__btn">Read post</Link>
        <p className="post__author">{postData.author.email}</p>
      </div>
    </div>
  )
})

export default PostCard