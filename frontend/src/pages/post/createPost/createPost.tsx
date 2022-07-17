import { FormEvent, useState } from "react";

import React from 'react';
import { useAction } from "../../../hooks/useAction";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useHistory } from "react-router-dom";

import "./createPost.scss"

const CreatePost: React.FC = () => {

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const { createPost } = useAction()

  const { id, isActivate } = useTypedSelector(state => state.user)


  const history = useHistory()

  const sendPostData = (e: FormEvent) => {
    e.preventDefault()
    createPost(title, body, id, history)

  }

  return (
    <>
      {isActivate ?

        <section className="create-post-container">
          <form className="create-post__wrapper">
            <input
              className="create-post__title"
              placeholder="Title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <textarea
              className="create-post__body"
              placeholder="Text"
              name="" id=""
              value={body}
              onChange={e => setBody(e.target.value)}
            ></textarea>
            <button onClick={sendPostData} className="btn create-post__create">Create post</button>
          </form>
        </section>

        : <h1 className="create-post__not-active">Account is not activated</h1>}
    </>
  );
};

export default CreatePost;


