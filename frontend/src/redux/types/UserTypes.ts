import { IUser } from "@/redux/interfaces/types";

export interface UserState extends IUser  {
  users?: IUser[]
  isAuth: boolean
}