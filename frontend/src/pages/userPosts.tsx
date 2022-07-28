import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";

import { useTypedSelector } from "../hooks/useTypedSelector";
import { useAction } from "../hooks/useAction";
import PostList from "../components/posts/postList";


interface IParams {
  userId: string
}

const UserPosts: React.FC = () => {

  const { getAllUserPosts, clearPostStore } = useAction()

  const [pageNumber, setPageNumber] = useState(1)
  const [limit, setLimit] = useState(5)


  const { userId } = useParams<IParams>()

  const { users } = useTypedSelector(state => state.user)
  const { hasMore } = useTypedSelector(state => state.post)

  const [userName, setUserName] = useState("")

  useEffect(() => {
    console.log(users)

    const userData = users?.filter(user => user.id === userId)

    if (userData !== undefined) {
      setUserName(userData[0].email)
    }

    return () => {
      clearPostStore()
      setPageNumber(1)
    }
  }, [])

  useEffect(() => {
    clearPostStore()
    setPageNumber(1)

  }, [limit])

  useEffect(() => {
    if (hasMore) {
      getAllUserPosts(userId, pageNumber, limit)
    }

  }, [pageNumber, limit, hasMore])

  return (
    <PageContext.Provider value={{ pageNumber, setPageNumber, limit, setLimit }}>
      <PostList author={userName} />
    </PageContext.Provider>
  );
};

export default UserPosts;