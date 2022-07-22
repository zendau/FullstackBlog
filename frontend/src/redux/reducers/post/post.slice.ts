import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PostState } from '@/redux/types/PostTypes';

const initialState: PostState = {
  posts: [],
  hasMore: true
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    fetchPost: (state: PostState, action: PayloadAction<any>) => {
      state.posts.push(...action.payload)
    },
    //getPost: () => {},
    clearPost: () => initialState,
    setHasMore: (state: PostState, action: PayloadAction<any>) => {
      state.hasMore = action.payload
    }
  },
})

export const postActions = postSlice.actions
export const postReducer = postSlice.reducer