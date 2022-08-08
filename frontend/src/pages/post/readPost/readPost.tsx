import "./readPost.scss"
import React, { useEffect } from 'react';
import { useParams } from "react-router";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import FetchLoader from "@/components/UI/fetchLoader/fetchLoader";
import { useLazyGetPostQuery } from '@/redux/reducers/post/post.api';
import Reaction from '@/components/post/reaction/reaction'
import Comments from '@/components/post/comment/comments'
import PostToolbar from '@/components/post/toolbar/toolbar'
import { dateFormat } from "@/utils/dateFormat";

interface IParams {
  id: string
}

const ReadPost: React.FC = () => {

  const { id } = useParams<IParams>()

  const { post } = useTypedSelector(state => state.postState)
  const { id: userId } = useTypedSelector(state => state.userState)
  const [getPostLoad] = useLazyGetPostQuery()


  useEffect(() => {
    getPostLoad(id)
  }, [])

  return (
    <>
      {
        post === null
          ?
          <FetchLoader />
          :
          <section className="read-post-container">
            <div className="read-post__wrapper">
              <div className="read-post__toolbar">
                <Reaction />
                <div className="read-post__post-data">
                  <p className="read-post__post-author">{post.author.email}</p>
                  <small className="read-post__post-date">{dateFormat(post.date)}</small>
                </div>
              </div>
              <PostToolbar postIdAuthor={post.author.id} postId={post.id} userId={userId} />
              <h1 className="read-post__title">{post.title}</h1>
              <img className="read-post__img" src={`${import.meta.env.VITE_API_URL}/image/${post.file.fileName}`} alt="img" />
              <div className="read-post__body" dangerouslySetInnerHTML={{ __html: post.body }}></div>
              <hr />
              <Comments />
            </div>
          </section>
      }
    </>
  );
}

export default ReadPost;