import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useSetReactionMutation } from '@/redux/reducers/post/post.api'
import React from 'react'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

import './reaction.scss'

const Reaction = () => {

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
    <div className='reaction__container'>
      <div className='reaction__item' onClick={setLike} style={{ color: isLiked === true ? 'green' : 'black' }}>
        <FontAwesomeIcon icon={faThumbsUp} />
        <span>{like}</span>
      </div>
      <div className='reaction__item' onClick={setDislike} style={{ color: isLiked === false ? 'red' : 'black' }}>
        <FontAwesomeIcon icon={faThumbsDown} />
        <span>{dislike}</span>
      </div>

    </div>
  )
}

export default Reaction