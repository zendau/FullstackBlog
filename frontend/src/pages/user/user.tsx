import React, { useState } from 'react'
import { Link, useParams } from "react-router-dom";
import FetchLoader from '@/components/UI/fetchLoader/fetchLoader'
import { useGetUserQuery } from '@/redux/reducers/user/user.api'
import Comments from "@/components/user/comments/comments"
import Reactions from '@/components/user/reactions/reactions'
import { isApiError } from '@/utils/isApiError'
import AlertMessage from '@/components/UI/Alert/Alert'

import '@/pages/account/account.scss'
import './user.scss'

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
    <section className="user__container">
      <div className="user__wrapper">
        <h1 className="account__main-title">{data.email}'s account</h1>
        <div className="user__rating-container">
          <h2 className="user__rating-title">Rating: </h2>
          <ul className='user__rating-values'>
            <li>{data.rating[0]}</li>
            <li>:</li>
            <li>{data.rating[1]}</li>
          </ul>
        </div>

        <Link className="btn account__get-posts user__btn" to={`/user/${userId}/posts`}>Show posts</Link>

        <button className='btn account__btn' onClick={() => setIsShowComments(!isShowComments)}>Show {isShowComments ? 'reactions' : 'comments'}</button>
        {
          isShowComments
            ?
            <Comments comments={data.comments} />
            :
            <Reactions reactions={data.reactions} />

        }
      </div>
    </section>
  )
}

export default User