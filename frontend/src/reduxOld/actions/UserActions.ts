import { Dispatch } from "redux";

import $api from "../../axios"

import { UserActionType, userTypes } from "../../redux/types/UserTypes"
import { IFetchUser } from "../../interfaces/user"
import { postTypes } from "../../redux/types/PostTypes";

export const userAuth = (email: string | undefined, password: string | undefined, setAuthStatus: (status: boolean) => void, type: string, route: { (path: string, state?: unknown): void }) => {

  return async (dispatch: Dispatch<UserActionType>) => {
    try {
      dispatch({ type: userTypes.USER_LOGIN })

      const userData = await $api.post<IFetchUser>(`/user/${type}`, {
        email, password
      })

      localStorage.setItem("token", userData.data.accessToken)

      setAuthStatus(true)

      dispatch({
        type: userTypes.USER_FETCH_SUCCESS, payload: {
          email: userData.data.userDto.email,
          id: userData.data.userDto.id,
          isActivate: userData.data.userDto.isActivated
        }
      })

      route("/account")

    } catch (e: any) {
      dispatch({
        type: userTypes.USER_FETCH_ERROR,
        payload: e.response.data.message
      })
    }
  }
}

export const cleanErrorMessage = () => {
  return { type: userTypes.CLEAR_ERROR_MESSAGE }
}

export const checkAuth = (setAuthStatus: (status: boolean) => void) => {
  return async (dispatch: Dispatch<UserActionType>) => {
    try {
      dispatch({ type: userTypes.USER_LOGIN })

      const fetchData = await $api.get(`/user/refresh`)

      if (fetchData.data.errors) {
        throw new Error(fetchData.data.message)
      }

      setAuthStatus(true)

      localStorage.setItem("token", fetchData.data.accessToken)
      dispatch({
        type: userTypes.USER_FETCH_SUCCESS, payload: {
          email: fetchData.data.user.email,
          id: fetchData.data.user.id,
          isActivate: fetchData.data.user.isActivated
        }
      })

    } catch (e) {

      dispatch({
        type: userTypes.USER_LOGOUT
      })
    }
  }
}

export const logout = (clearPostStore: () => { type: postTypes }) => {
  return async (dispatch: Dispatch<UserActionType>) => {
    try {

      await $api.get(`/user/logout`)

      localStorage.removeItem("token")

      dispatch({
        type: userTypes.USER_LOGOUT,
      })
      clearPostStore()
    } catch (e) {
      console.error(e)
    }
  }
}

export const getAllUsers = () => {
  return async (dispatch: Dispatch<UserActionType>) => {
    try {
      const fetchData = await $api.get(`/user/all`)
      dispatch({
        type: userTypes.GET_ALL_USERS,
        payload: fetchData.data
      })
    } catch (e) {
      console.error(e)
    }
  }
}



export const userDataUpdateRequest = (userId: string, newEmail: string) => {
  return async (dispatch: Dispatch<UserActionType>) => {
    try {
      const fetchData = await $api.post(`/user/update`, {
        userId, newEmail
      })

      if (fetchData.data !== "OK") {
        throw new Error("Wrong userDataUpdateRequest")
      }

      dispatch({
        type: userTypes.CHANGE_REQUEST,
        payload: true
      })
    } catch (e: any) {
      dispatch({
        type: userTypes.USER_FETCH_ERROR,
        payload: e.response.data.message
      })
    }
  }
}

export const SendCodeForUpdateRequest = (userId: string, newEmail: string, newPassword: string, code: string) => {
  return async (dispatch: Dispatch<UserActionType>) => {
    try {
      const fetchData = await $api.put(`/user/saveNewData`, {
        userId, code, newEmail, newPassword
      })

      localStorage.setItem("token", fetchData.data.accessToken)


      dispatch({
        type: userTypes.USER_FETCH_SUCCESS, payload: {
          email: fetchData.data.userDto.email,
          id: fetchData.data.userDto.id,
          isActivate: fetchData.data.userDto.isActivated
        }
      })

      dispatch({
        type: userTypes.CHANGE_REQUEST,
        payload: true
      })
    } catch (e: any) {
      dispatch({
        type: userTypes.USER_FETCH_ERROR,
        payload: e.response.data.message
      })
    }
  }
}