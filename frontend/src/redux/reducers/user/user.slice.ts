import { IUser } from '@/interfaces/IUser';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUserState } from '@/interfaces/state/IUserState'
import jwt from 'jwt-decode'

const initialState: IUserState = {
  id: "",
  email: "",
  isActivated: false,
  isAuth: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: IUserState, action: PayloadAction<any>) => {
      state.email = action.payload.email
      state.id = action.payload.id
      state.isActivated = action.payload.isActivated
      state.isAuth = true
    },
    logout: (state: IUserState) => {
      state = initialState
      state.isAuth = false
    },
    activate: (state: IUserState) => {
      state.isActivated = true
    },
    checkAuth: (state: IUserState) => {
      const accessToken = localStorage.getItem('token')

      if (accessToken) {
        try {
          const tokenDecode: any = jwt<any>(accessToken)
          const userData: IUser = tokenDecode.payload

          state.email = userData.email
          state.id = userData.id
          state.isActivated = userData.isActivated

          state.isAuth = true
        } catch {
          state.isAuth = false
        }
      } else {
        state.isAuth = false
        localStorage.removeItem('token')
      }
    }
  },
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer