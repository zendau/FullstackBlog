import { IComment } from '@/interfaces/IComment';
import { IPost } from '@/interfaces/IPost';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IPostState } from '@/interfaces/state/IPostState';

const initialState: IPostState = {
  post: null,
  posts: [],
  hasMore: true,
  pageNumber: 1,
  limit: 5,
  isSearched: false
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    fetchPosts: (state: IPostState, action: PayloadAction<IPost[]>) => {
      state.posts.push(...action.payload)
    },
    setPost: (state: IPostState, action: PayloadAction<IPost>) => {
      state.post = action.payload
    },
    clearPosts: (state: IPostState) => {
      state.posts = []
    },
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
    },
    editComment: (state: IPostState, action: PayloadAction<IComment>) => {
      state.post!.comments = state.post!.comments.map(comment => comment.id === action.payload.id ? action.payload : comment)
    },
    deleteComment: (state: IPostState, action: PayloadAction<IComment>) => {
      state.post!.comments = state.post!.comments.filter(comment => comment.id !== action.payload.id)
    },
    setPageNumber: (state: IPostState, action: PayloadAction<number>) => {
      state.pageNumber = action.payload
      state.hasMore = true
    },
    incPageNumber: (state: IPostState) => {
      state.pageNumber++
    },
    setLimit: (state: IPostState, action: PayloadAction<number>) => {
      state.limit = action.payload
    },
    setSearched: (state: IPostState, action: PayloadAction<boolean>) => {
      state.isSearched = action.payload
    },
    
  },
})

export const postActions = postSlice.actions
export const postReducer = postSlice.reducer