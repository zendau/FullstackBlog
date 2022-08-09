import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IAlert from '@/interfaces/state/IAlertState'

const initialState: IAlert = {
  message: '',
  type: ''
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state: IAlert, action: PayloadAction<IAlert>) => {
      state.message = action.payload.message
      state.type = action.payload.type
    },
    clearError: () => initialState,
  },
})

export const alertActions = alertSlice.actions
export const alertReducer = alertSlice.reducer