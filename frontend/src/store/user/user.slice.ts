import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { UserState } from '../../redux/types/UserTypes'

// Define the initial state using that type
const initialState: UserState = {
  id: "",
  email: "",
  isActivate: false,
  isLoaded: false,
  error: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setError: (state: UserState, action: PayloadAction<any>) => {
      state.error = action.payload
    },
    setUser: (state: UserState, action: PayloadAction<any>) => {
      state.email = action.payload.test
    },
    logout: () => initialState,
  },
})

export const { setError, logout, setUser } = userSlice.actions
export default userSlice.reducer