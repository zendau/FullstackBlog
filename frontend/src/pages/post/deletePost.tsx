import React, { useEffect } from 'react';
import { useParams } from "react-router";
import { useAction } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface IParams {
  id: string
}

const DeletePost: React.FC = () => {

  const { id } = useParams<IParams>()

  const { posts } = useTypedSelector(state => state.post)

  const { deletePost } = useAction()

  useEffect(() => {
    deletePost(id, posts)
  }, [])

  return (
    <div>

    </div>
  );
};

export default DeletePost;