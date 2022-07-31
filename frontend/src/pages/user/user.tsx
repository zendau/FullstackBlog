import React from 'react'
import { useParams } from 'react-router-dom'

interface IParams {
  userId: string
}

const User = () => {

  const { userId } = useParams<IParams>()

  return (
    <div>{ userId }</div>
  )
}

export default User