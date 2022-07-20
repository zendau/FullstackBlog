import { IPost } from "../../interfaces/post";

export enum postTypes {
  POST_FETCH = "POST_FETCH",
  POST_FETCH_SUCCESS = "POST_FETCH_SUCCESS",
  POST_FETCH_ERROR = "POST_FETCH_ERROR",
  POSTS_FETCH_SUCCESS = "POSTS_FETCH_SUCCESS",
  CLEAR_POST_STORE = "CLEAR_POST_STORE",
  SET_HAS_MORE = "SET_HAS_MORE"
}



export interface PostState {
  posts: IPost[],
  isLoaded?: boolean,
  error?: string,
  hasMore?: boolean
}

interface PostFetchAction {
  type: postTypes.POST_FETCH
}


interface PostFetchSuccessAction {
  type: postTypes.POST_FETCH_SUCCESS,
  payload: IPost
}

interface PostFetchErrorAction {
  type: postTypes.POST_FETCH_ERROR,
  payload: string
}

interface PostsFetchSuccessAction {
  type: postTypes.POSTS_FETCH_SUCCESS,
  payload: IPost[]
}

interface ClearPostStore {
  type: postTypes.CLEAR_POST_STORE
}

interface SetHasMoreAction {
  type: postTypes.SET_HAS_MORE,
  payload: boolean
}

export type PostActionType =
  PostFetchAction |
  PostFetchSuccessAction |
  PostFetchErrorAction |
  PostsFetchSuccessAction |
  ClearPostStore |
  SetHasMoreAction