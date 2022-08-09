import { IReactionList } from '@/interfaces/IReactionList'
import React from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

import '@/components/post/reaction/reaction.scss'

interface Props {
  reactions: IReactionList[]
}

const Reactions = ({ reactions }: Props) => {
  return (
    <>
      {
        reactions.length > 0
          ? <>
            <h2 className='reaction__title' >Reactions: {reactions.length}</h2>
            <ul className='reaction__list'>
              {
                reactions.map((reaction) =>
                  <li key={reaction.id}>
                    <Link to={`/post/${reaction.postId}`}>
                      <h3>{reaction.postTitle}</h3>
                    </Link>
                    <p>{reaction.isLiked ? <FontAwesomeIcon color='green' icon={faThumbsUp} /> : <FontAwesomeIcon color='red' icon={faThumbsDown} />}</p>
                  </li>
                )
              }
            </ul>
          </>
          : <h3 className='comments__empty' >This user has no reactions yet</h3>
      }

    </>

  )
}

export default Reactions