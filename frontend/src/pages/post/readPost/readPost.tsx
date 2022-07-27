import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from "react-router";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IPost } from "../../../interfaces/post";
import { Link, useHistory } from "react-router-dom"
import Loader from "../../../components/UI/loader/loader";
import FetchLoader from "../../../components/UI/fetchLoader/fetchLoader";

import "./readPost.scss"
import { useLazyGetPostQuery } from '@/redux/reducers/post/post.api';

import Reaction from '@/components/post/reaction/reaction'
import Comments from '@/components/post/comment/comments'

interface IParams {
  id: string
}

function convertDate(date: string): string {
  const convertedDate = new Date(date)
  return new Intl.DateTimeFormat("en-US").format(convertedDate)
}


const ReadPost: React.FC = () => {

  const { id } = useParams<IParams>()

  const { post } = useTypedSelector(state => state.postState)
  const { id: userID } = useTypedSelector(state => state.userState)

  const { location } = useHistory()

  const [getPost, { data }] = useLazyGetPostQuery()

  useEffect(() => {
    getPost(id)

  }, [])

  // useEffect(() => {
  //   if (data) {
  //     setPost(data)
  //   }
  // }, [data])

  const checkStatus = useMemo(() => userID === post?.author.id, [post, userID])

  return (
    <>
      {post === null
        ?
        <FetchLoader />
        :
        <section className="read-post-container">
          <div className="read-post__wrapper">
            <div className="read-post__toolbar">
              <Reaction />
              <div className="read-post__post-data">
                <p className="read-post__post-author">{post.author.email}</p>
                <small className="read-post__post-date">{convertDate(post.date)}</small>
              </div>
              {
                checkStatus ?
                  <div className="read-post__btn-container">
                    <Link className="btn read-post__edit" to={"/post/edit/" + post.id}>Edit post</Link>
                    <Link className="btn read-post__delete" to={"/post/delete/" + post.id}>Delete post</Link>
                  </div> :
                  ""
              }
            </div>
            <h1 className="read-post__title">{post.title}</h1>
            <div className="read-post__body" dangerouslySetInnerHTML={{ __html: post.body }}></div>
            <Comments/>
          </div>
         
        </section>
      }
    </>
  );
}

export default ReadPost;