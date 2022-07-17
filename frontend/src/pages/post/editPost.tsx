import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { useParams } from "react-router";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAction } from "../../hooks/useAction";
import { Link, Redirect } from "react-router-dom";

import "./createPost/createPost.scss"
import FetchLoader from "../../components/UI/fetchLoader/fetchLoader";

interface IParams {
  id: string
}

const EditPost: React.FC = () => {

  const { id } = useParams<IParams>()

  const { editPost } = useAction()

  const { posts } = useTypedSelector(state => state.post)
  const { id: userId } = useTypedSelector(state => state.user)


  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const [isLoaded, setIsLoaded] = useState(true)
  const [checkStatus, setCheckStatus] = useState(true)

  useEffect(() => {

    const data = posts.filter((post) => post.id === id)[0]


    if (data !== undefined) {
      setTitle(data.title)
      setBody(data.body)
    }

    setCheckStatus(userId === data?.author.id)
    setIsLoaded(false)


  }, [posts])


  const sendPostData = (e: FormEvent) => {
    e.preventDefault()
    editPost(id, userId, title, body, posts)

  }



  return (
    <>{
      isLoaded ?
        <FetchLoader /> :
        <>{
          checkStatus ?
            <>
              <section className="create-post-container">
                <form className="create-post__wrapper">
                  <input className="create-post__title"
                    placeholder="Title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)} />
                  <textarea
                    className="create-post__body"
                    placeholder="Text"
                    value={body}
                    onChange={e => setBody(e.target.value)}>
                    Post text
                  </textarea>
                  <button className="btn create-post__create" onClick={sendPostData}>Edit post</button>
                </form>
              </section>
            </>
            :
            <Redirect to={"/post/all"} />
        }</>

    }


    </>
  )
}

export default EditPost;