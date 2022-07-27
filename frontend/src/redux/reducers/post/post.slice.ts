import { IComment } from './../../../interfaces/IComment';
import { IPost } from '@/interfaces/post';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IPostState } from '@/interfaces/state/IPostState';

const initialState: IPostState = {
  post: null,
  posts: [],
  hasMore: true
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    fetchPost: (state: IPostState, action: PayloadAction<IPost[]>) => {
      state.posts.push(...action.payload)
    },
    getPost: (state: IPostState, action: PayloadAction<IPost>) => {
      state.post = action.payload
    },
    clearPost: () => initialState,
    setHasMore: (state: IPostState, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload
    },
    setLiked: (state: IPostState, action: PayloadAction<boolean | null>) => {

      const prevLiked = state.post!.reaction.isLiked
      const isLiked = action.payload

      if (isLiked === true) {
        state.post!.reaction.like++
        if (prevLiked === false) {
          state.post!.reaction.dislike--
        }

      } else if (isLiked === false) {
        state.post!.reaction.dislike++
        if (prevLiked === true) {
          state.post!.reaction.like--
        } 

      } else {
        if (prevLiked === true) {
          state.post!.reaction.like--
        } else if (prevLiked === false) {
          state.post!.reaction.dislike--
        }
      }

      state.post!.reaction.isLiked = isLiked
    },
    addComment: (state: IPostState, action: PayloadAction<IComment>) => {
      state.post?.comments.push(action.payload)
    }
  },
})

export const postActions = postSlice.actions
export const postReducer = postSlice.reducer