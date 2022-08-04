import { IUser } from '@/interfaces/user';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUserState } from '@/interfaces/state/IUserState'
import jwt from 'jwt-decode'

const initialState: IUserState = {
  id: "",
  email: "",
  isActivated: false,
  isAuth: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: IUserState, action: PayloadAction<any>) => {
      state.email = action.payload.email
      state.id = action.payload.id
      state.isActivated = action.payload.id
      state.isAuth = true
    },
    logout: () => initialState,
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