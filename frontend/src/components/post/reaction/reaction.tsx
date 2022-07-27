import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { IReaction } from '@/interfaces/IReaction'
import { useSetReactionMutation } from '@/redux/reducers/post/post.api'
import React, { useMemo, useState } from 'react'
import { boolean } from 'yup'


const Reaction =  () => {

  const { post } = useTypedSelector(state => state.postState)
  const { setLiked } = useAction()
  const { like, dislike, isLiked } = post!.reaction


  const [postReaction] = useSetReactionMutation()

  function setLike() {
    if (isLiked === true) {
      setLiked(null)
      postReaction({
        isLiked: null,
        postId: post!.id
      })
    } else {
      setLiked(true)
      postReaction({
        isLiked: true,
        postId: post!.id
      })
    }
  }

  function setDislike() {
    if (isLiked === false) {
      setLiked(null)
      postReaction({
        isLiked: null,
        postId: post!.id
      })
    } else {
      setLiked(false)
      postReaction({
        isLiked: false,
        postId: post!.id
      })
    }
  }

  return (
    <div>
      <div onClick={setLike} style={{ backgroundColor: isLiked === true ? 'red' : 'white' }}>
        <img src='/src/assets/like.svg' alt="like" />
        <span>{like}</span>
      </div>
      <div onClick={setDislike} style={{ backgroundColor: isLiked === false ? 'red' : 'white' }}>
        <img src='/src/assets/dislike.svg' alt="dislike" />
        <span>{dislike}</span>
      </div>

    </div>
  )
}

export default Reaction