import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from "react-router";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IPost } from "../../../interfaces/post";
import { Link } from "react-router-dom"
import Loader from "../../../components/UI/loader/loader";
import FetchLoader from "../../../components/UI/fetchLoader/fetchLoader";

import "./readPost.scss"

interface IParams {
  id: string
}

function convertDate(date: string): string {
  const convertedDate = new Date(date)
  return new Intl.DateTimeFormat("en-US").format(convertedDate)
}


const ReadPost: React.FC = () => {

  const { id } = useParams<IParams>()

  const [post, setPost] = useState<IPost>()

  const { posts } = useTypedSelector(state => state.postState)
  const { id: userID } = useTypedSelector(state => state.userState)

  useEffect(() => {
    const data = posts.filter((post) => post.id === id)[0]
    console.log(2, data)
    setPost(data)

  }, [posts])

  const checkStatus = useMemo(() => userID === post?.author.id, [post, userID])

  return (
    <>
      {post === undefined
        ?
        <FetchLoader />
        :
        <section className="read-post-container">
          <div className="read-post__wrapper">
            <div className="read-post__toolbar">
              <div className="read-post__post-data">
                <p className="read-post__post-author">{post.author.email}</p>
                <small className="read-post__post-date">{convertDate(post.date)}</small>
              </div>
              {
                checkStatus ?
                  <div className="read-post__btn-container">
                    <Link className="btn read-post__edit" to={"/post/edit/" + post?.id}>Edit post</Link>
                    <Link className="btn read-post__delete" to={"/post/delete/" + post?.id}>Delete post</Link>
                  </div> :
                  ""
              }
            </div>
            <h1 className="read-post__title">{post?.title}</h1>
            <p className="read-post__body"> {post?.body} </p>
          </div>
        </section>
      }
    </>
  );
}

export default ReadPost;