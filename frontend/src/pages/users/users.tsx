import "./users.scss"
import React from 'react';
import FetchLoader from "@/components/UI/fetchLoader/fetchLoader";
import { useGetUsersQuery } from '@/redux/reducers/user/user.api';
import UserList from '@/components/userList/userList';
import { isApiError } from '@/utils/isApiError';
import AlertMessage from '@/components/UI/Alert/Alert';

const Users: React.FC = () => {

  const { data, isLoading, isError } = useGetUsersQuery()

  if (isLoading) {
    return <FetchLoader />
  }

  if (isError || isApiError(data) || data === undefined) {
    return <AlertMessage timeout={5000} />
  }

  return (
    <section className="users-container">
      <ul className="users__list">
        <UserList users={data} />
      </ul>
    </section>
  );
};

export default Users;