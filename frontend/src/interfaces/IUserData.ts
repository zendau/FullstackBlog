import { IReactionList } from './IReactionList';
import { ICommentList } from './ICommentList';
import { IUser } from './IUser';

export interface IUserData extends IUser {
  rating: number[]
  comments: ICommentList[]
  reactions: IReactionList[]
}

