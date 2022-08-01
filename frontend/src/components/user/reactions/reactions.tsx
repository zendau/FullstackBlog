import { IReactionList } from '@/interfaces/IReactionList'
import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  reactions: IReactionList[]
}

const Reactions = ({reactions}: Props) => {
  return (
    <ul>
      {
        reactions.map((reaction) => 
          <li key={reaction.id} style={{'border': '1px solid black'}}>
            <Link to={`/post/${reaction.postId}`}>
              <h3>{reaction.postTitle}</h3>
              <p>{reaction.isLiked ? 'like' : 'dislike'}</p>
            </Link>
          </li>
        )
      }
    </ul>
  )
}

export default Reactions