import { IUser } from "../../interfaces/user";

export enum userTypes {
  USER_LOGIN = "USER_LOGIN",
  USER_REGISTER = "USER_REGISTER",
  USER_FETCH_SUCCESS = "USER_FETCH_SUCCESS",
  USER_FETCH_ERROR = "USER_FETCH_ERROR",
  USER_LOGOUT = "USER_LOGOUT",
  CLEAR_ERROR_MESSAGE = "CLEAR_ERROR_MESSAGE",
  GET_ALL_USERS = "GET_ALL_USERS",
  CHANGE_REQUEST = "CHANGE_REQUEST",
}



export interface UserState {
  email: string
  isActivate: boolean
  id: string,
  isLoaded?: boolean
  error?: string | null
  users?: IUser[]
  confirmCode?: boolean
}

interface UserLoginAction {
  type: userTypes.USER_LOGIN,
}

interface UserRegisterAction {
  type: userTypes.USER_REGISTER,
}

interface UserFetchSuccessAction {
  type: userTypes.USER_FETCH_SUCCESS,
  payload: UserState
}

interface UserFetchErrorAction {
  type: userTypes.USER_FETCH_ERROR,
  payload: string
}


interface UserLogoutAction {
  type: userTypes.USER_LOGOUT
}

interface ClearErrorMessageAction {
  type: userTypes.CLEAR_ERROR_MESSAGE
}

interface GetAllUsersAction {
  type: userTypes.GET_ALL_USERS
  payload: IUser[]
}

interface ConfirmCodeAction {
  type: userTypes.CHANGE_REQUEST,
  payload: boolean
}




export type UserActionType =
  UserLoginAction |
  UserRegisterAction |
  UserFetchSuccessAction |
  UserFetchErrorAction |
  UserLogoutAction |
  ClearErrorMessageAction |
  GetAllUsersAction |
  ConfirmCodeAction