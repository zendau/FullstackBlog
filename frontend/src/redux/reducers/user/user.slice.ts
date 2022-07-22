import { IUser } from '@/redux/interfaces/types';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserState } from '@/redux/types/UserTypes'
import jwt from 'jwt-decode'

const initialState: UserState = {
  id: "",
  email: "",
  isActivate: false,
  isAuth: false,
  users: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<any>) => {
      state.email = action.payload.email
      state.id = action.payload.id
      state.isActivate = action.payload.id
      state.isAuth = true
    },
    logout: () => initialState,
    checkAuth: (state: UserState) => {
      const accessToken = localStorage.getItem('token')

      if (accessToken) {
        try {
          const tokenDecode: any = jwt<any>(accessToken)
          const userData: IUser = tokenDecode.payload

          state.email = userData.email
          state.id = userData.id
          state.isActivate = userData.isActivate

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