import { IUser } from './user';
export interface IComment {
  id: string
  user: IUser
  message: string
  edited: boolean
}
