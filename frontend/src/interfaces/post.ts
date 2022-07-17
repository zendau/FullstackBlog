import { IUser } from "./user";

export interface IPost {
  title: string
  body: string
  date: string
  id: string
  author: IUser
}