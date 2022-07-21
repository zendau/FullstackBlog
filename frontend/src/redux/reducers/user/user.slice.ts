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
      state.email = action.payload.test
    },
    logout: () => initialState,
    checkAuth: (state: UserState) => {
      debugger
      const accessToken = localStorage.getItem('token')

      if (accessToken) {
        try {
          const tokenDecode: IUser = jwt<any>(accessToken).payload
          
          state.email = tokenDecode.email
          state.id = tokenDecode.id
          state.isActivate = tokenDecode.isActivate

          state.isAuth = true

        } catch {
          state.isAuth = false
          // const resRefresh = await $api.get('/user/refresh')

          // if (resRefresh.data.statusCode === 401) return

          // const accessToken = resRefresh.data.accessToken
          // localStorage.setItem('token', accessToken)
          // tokenDecode = jwt_decode(accessToken)
        }
      }
    }
  },
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer