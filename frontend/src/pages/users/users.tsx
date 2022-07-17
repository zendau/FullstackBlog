import React, { useEffect } from 'react';
import "./users.scss"
import { useAction } from "../../hooks/useAction";
import { Link } from "react-router-dom";
import FetchLoader from "../../components/UI/fetchLoader/fetchLoader";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const Users: React.FC = () => {

  const { users } = useTypedSelector(state => state.user)

  const { getAllUsers } = useAction()

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <>
      <section className="users-container">
        <ul className="users__list">
          {users ? users.map((user, index) =>

            <li className="user" key={user.email}>
              <p className="user__number">{index + 1}.</p>
              <Link
                className="user__email"
                key={user.email}
                to={`/user/${user.id}`}
              >{user.email}
              </Link>
            </li>
          ) : <h1 className="message-info">No have users</h1>}
        </ul>
      </section>


    </>

  );
};

export default Users;