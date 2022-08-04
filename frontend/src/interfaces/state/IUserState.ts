import { IUser } from "@/interfaces/IUser";

export interface IUserState extends IUser  {
  isAuth: boolean
}