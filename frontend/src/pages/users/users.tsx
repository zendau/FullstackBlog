import React, { useEffect } from 'react';
import "./users.scss"
import { useAction } from "../../hooks/useAction";
import { Link } from "react-router-dom";
import FetchLoader from "@/components/UI/fetchLoader/fetchLoader";
import { useGetUsersQuery } from '@/redux/reducers/user/user.api';
import UserList from '../../components/userList/userList';

const Users: React.FC = () => {

  const { data: users, isLoading } = useGetUsersQuery()

  return (
    <>
      <section className="users-container">
        <ul className="users__list">

          {
            isLoading
              ? <FetchLoader/>
              : <UserList users={users}/>
          }
        </ul>
      </section>
    </>
  );
};

export default Users;