export interface IUser {
  email: string,
  id: string,
  isActivated: boolean
}

export interface IFetchUser {
  accessToken: string
  refreshToken: string
  userDto: IUser
}