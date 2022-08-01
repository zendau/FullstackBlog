import FetchLoader from '@/components/UI/fetchLoader/fetchLoader'
import { useGetUserQuery } from '@/redux/reducers/user/user.api'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Comments from "@/components/user/comments/comments"
import Reactions from '@/components/user/reactions/reactions'

interface IParams {
  userId: string
}

const User = () => {

  const { userId } = useParams<IParams>()
  const [isShowComments, setIsShowComments] = useState(true)

  const { isLoading, data } = useGetUserQuery(userId)
  return (
    <>
      {
        isLoading
          ? <FetchLoader />
          :
          <div>
            {data.email}
            <ul>
              <li>{data.rating[0]}:</li>
              <li>{data.rating[1]}</li>
            </ul>
            <button onClick={() => setIsShowComments(!isShowComments)}>Show {isShowComments ? 'reactions' : 'comments'}</button>
            {
              isShowComments
                ? < >
                  <h2>Comments</h2>
                  <Comments comments={data.comments} />
                </>
                : <>
                  <h2>Reactions</h2>
                  <Reactions reactions={data.reactions} />
                </>
            }
          </div>
      }
    </>
  )
}

export default User