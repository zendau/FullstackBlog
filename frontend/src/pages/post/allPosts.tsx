import React from 'react';
import PostList from "@/components/posts/postList";
import { usefetchPosts } from "@/hooks/useFetchPosts";

const AllPosts: React.FC = () => {

  usefetchPosts()
  console.log('enter')

  return (
    <PostList />
  );
};

export default AllPosts;