export interface IUser {
  email: string,
  id: string,
  isActivate: boolean
}

export interface IFetchUser {
  accessToken: string
  refreshToken: string
  userDto: IUser
}