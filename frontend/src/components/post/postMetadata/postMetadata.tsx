import React from "react";
import { useTypedSelector } from "@/hooks/useTypedSelector";

const PostMetadata: React.FC = () => {
  const { post } = useTypedSelector((state) => state.postState);
  const { like, dislike } = post!.reaction;
  const commentsCount = post?.comments ? post.comments.length : 0;

  return (
    <>
      <p>Rating: {like - dislike}</p>
      <p>Comments: {commentsCount}</p>
      <p>Read: {1}</p>
    </>
  );
};

export default PostMetadata;
