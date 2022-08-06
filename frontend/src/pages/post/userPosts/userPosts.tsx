import React from 'react';
import { useParams } from "react-router";
import PostList from "@/components/posts/postList";
import { usefetchPosts } from '@/hooks/useFetchPosts';

interface IParams {
  userId: string
}

const UserPosts: React.FC = () => {

  const { userId } = useParams<IParams>()
  usefetchPosts(userId)

  return (
    <PostList />
  )
}

export default UserPosts;