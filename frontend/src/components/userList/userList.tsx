import { IUser } from '@/interfaces/IUser'
import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  users: IUser[] | undefined
}

const userList = ({ users }: Props) => {
  return (
    <>
      {
        users ? users.map((user, index) =>

          <li className="user" key={user.email}>
            <p className="user__number">{index + 1}.</p>
            <Link
              className="user__email"
              key={user.email}
              to={`/user/${user.id}`}
            >{user.email}
            </Link>
          </li>
        ) : <h1 className="message-info">No have users</h1>
      }
    </>

  )
}

export default userList