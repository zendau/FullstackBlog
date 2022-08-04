import { IUser } from './IUser';
export interface IComment {
  id: string
  user: IUser
  message: string
  edited: boolean
}
