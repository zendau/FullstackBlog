import React, { useEffect } from 'react';
import { useEditPostMutation, useLazyGetPostQuery } from "@/redux/reducers/post/post.api";
import PostEditor from "@/components/postEditor/postEditor";
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { useParams } from 'react-router-dom';

interface IParams {
  id: string
}

const CreatePost: React.FC = () => {

  const { post } = useTypedSelector(state => state.postState)
  const [getPost] = useLazyGetPostQuery()

  const { id } = useParams<IParams>()
  useEffect(() => {
    if (post === null) {
      getPost(id)
    }

  }, [])

  return (
    <PostEditor 
      isCreate={false} 
      savePostRequest={useEditPostMutation}
    />
  );
};

export default CreatePost;


