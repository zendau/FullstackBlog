import { IUser } from "@/interfaces/user";

export interface IUserState extends IUser  {
  isAuth: boolean
}