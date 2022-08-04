import { IComment } from './IComment';
import { IReaction } from './IReaction';
import { IFile } from "./IFile";
import { IUser } from "./IUser";

export interface IPost {
  title: string
  body: string
  date: string
  id: string
  author: IUser
  file: IFile
  reaction: IReaction
  comments: IComment[]
}