import React from 'react';
import { useCreatePostMutation } from "@/redux/reducers/post/post.api";
import PostEditor from "@/components/postEditor/postEditor";

const CreatePost: React.FC = () => {
  return (
    <PostEditor isCreate={true} savePostRequest={useCreatePostMutation} />
  );
};

export default CreatePost;


