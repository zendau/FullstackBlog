import React from 'react';
import PostList from "@/components/posts/postList";
import { usefetchPosts } from "@/hooks/useFetchPosts";

const AllPosts: React.FC = () => {
  usefetchPosts()
  return (
    <PostList />
  );
};

export default AllPosts;