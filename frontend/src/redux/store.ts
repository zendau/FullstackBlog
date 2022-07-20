import { configureStore } from '@reduxjs/toolkit'
import { mainApi } from './api/base.api'
import userReducer from './reducers/user/user.slice'

import { alertReducer } from './reducers/alert/alert.slice'


export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    userState: userReducer,
    alertState: alertReducer
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([mainApi.middleware])
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
