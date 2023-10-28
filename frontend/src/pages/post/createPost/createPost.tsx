import React, { useState } from "react";
import { useCreatePostMutation } from "@/redux/reducers/post/post.api";
import PostEditor from "@/components/postEditor/postEditor";
import AlertMessage from "@/components/UI/Alert/Alert";

const CreatePost: React.FC = () => {
  return (
    <>
      <AlertMessage timeout={5000} />
      <PostEditor isCreate={true} savePostRequest={useCreatePostMutation} />
    </>
  );
};

export default CreatePost;
