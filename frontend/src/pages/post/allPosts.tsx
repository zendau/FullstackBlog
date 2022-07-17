import React, { useContext } from 'react';
import PostList from "../../components/posts/postList";
import { useFetchPosts } from "../../hooks/useFetchPosts";
import { PageContext } from "../../context/PageContext";

const AllPosts: React.FC = () => {

  const { pageNumber } = useContext(PageContext)

  useFetchPosts(pageNumber)

  return (
    <PostList />
  );
};

export default AllPosts;