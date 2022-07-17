import { PostActionType, PostState, postTypes } from "../types/PostTypes";

const initState: PostState = {
  posts: [],
  isLoaded: false,
  error: "",
  hasMore: true
}

export default function reducer(state = initState, action: PostActionType): PostState {
  switch (action.type) {
    case postTypes.POST_FETCH:
      return {
        ...state, isLoaded: true
      }
    case postTypes.POST_FETCH_SUCCESS:
      return {
        isLoaded: false,
        posts: [...state.posts, action.payload]
      }

    case postTypes.POST_FETCH_ERROR:
      return {
        isLoaded: false,
        posts: state.posts,
        error: action.payload
      }

    case postTypes.POSTS_FETCH_SUCCESS:
      return {
        ...state,
        isLoaded: false,
        posts: [...state.posts, ...action.payload]
      }

    case postTypes.CLEAR_POST_STORE:
      return {
        posts: [],
        isLoaded: false,
        error: "",
        hasMore: true
      }

    case postTypes.SET_HAS_MORE:
      return {
        ...state,
        hasMore: action.payload
      }

    default:
      return state
  }
}