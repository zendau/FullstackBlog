import React, { useState } from 'react'
import { Link, useParams } from "react-router-dom";
import FetchLoader from '@/components/UI/fetchLoader/fetchLoader'
import { useGetUserQuery } from '@/redux/reducers/user/user.api'
import Comments from "@/components/user/comments/comments"
import Reactions from '@/components/user/reactions/reactions'
import { isApiError } from '@/utils/isApiError'
import AlertMessage from '@/components/UI/Alert/Alert'

interface IParams {
  userId: string
}

const User = () => {

  const { userId } = useParams<IParams>()
  const [isShowComments, setIsShowComments] = useState(true)

  const { isLoading, isError, data } = useGetUserQuery(userId)

  if (isLoading) {
    return <FetchLoader />
  }

  if (isError || isApiError(data) || data === undefined) {
    return <AlertMessage timeout={5000} />
  }


  return (
    <div>
      {data.email}
      <ul>
        <li>{data.rating[0]}:</li>
        <li>{data.rating[1]}</li>
      </ul>
      <button onClick={() => setIsShowComments(!isShowComments)}>Show {isShowComments ? 'reactions' : 'comments'}</button>
      {
        isShowComments
          ?
          <>
            <h2>Comments</h2>
            <Comments comments={data.comments} />
          </>
          :
          <>
            <h2>Reactions</h2>
            <Reactions reactions={data.reactions} />
          </>
      }
      <Link to={`/user/${userId}/posts`}>Show posts</Link>
    </div>
  )
}

export default User