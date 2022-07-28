import React from 'react';
import PostList from "@/components/posts/postList";
import { useFetchPosts } from "@/hooks/useFetchPosts";

const AllPosts: React.FC = () => {

  useFetchPosts()

  return (
    <PostList />
  );
};

export default AllPosts;