import { PostActionType, postTypes } from "../../redux/types/PostTypes";
import { Dispatch } from "redux";

import $api from "../../axios"
import { IPost } from "../../interfaces/post"
import { History } from 'history';
import IFetchPosts from "../../interfaces/fetchPosts";

export const createPost = (title: string, body: string, author: string, history: History) => {
  return async (dispatch: Dispatch<PostActionType>) => {
    try {
      dispatch({ type: postTypes.POST_FETCH })

      const postData = await $api.post<IPost>("/post/create", {
        author, title, body
      })

      dispatch({ type: postTypes.POST_FETCH_SUCCESS, payload: postData.data })
      history.push(postData.data.id)
    } catch (e: any) {
      dispatch({ type: postTypes.POST_FETCH_ERROR, payload: e.response.data.message })
    }


  }
}

export const editPost = (postId: string, userId: string, title: string, body: string, posts: IPost[]) => {
  return async (dispatch: Dispatch<PostActionType>) => {
    try {
      dispatch({ type: postTypes.POST_FETCH })

      debugger

      const postData = await $api.post<IPost>("/post/edit", {
        postId, userId, title, body
      })

      console.log(postData)

      posts = posts.map(item => item.id === postData.data.id ? postData.data : item)

      dispatch({ type: postTypes.POSTS_FETCH_SUCCESS, payload: posts })
      // history.push(postData.data.id)
    } catch (e: any) {
      dispatch({ type: postTypes.POST_FETCH_ERROR, payload: e.response.data.message })
    }


  }
}

export const deletePost = (postId: string, posts: IPost[]) => {
  return async (dispatch: Dispatch<PostActionType>) => {
    try {
      dispatch({ type: postTypes.POST_FETCH })


      const postData = await $api.get<IPost>("/post/delete/" + postId)
      debugger

      posts = posts.filter(item => item.id !== postData.data.id)

      dispatch({ type: postTypes.POSTS_FETCH_SUCCESS, payload: posts })
      // history.push(postData.data.id)
    } catch (e: any) {
      dispatch({ type: postTypes.POST_FETCH_ERROR, payload: e.response.data.message })
    }
  }
}

export const getAllUserPosts = (userId: string, currentPage: number, limit: number) => {
  return async (dispatch: Dispatch<PostActionType>) => {
    try {
      dispatch({ type: postTypes.POST_FETCH })

      const postData = await $api.get<IFetchPosts>("/post/getUserPosts/", {
        params: {
          currentPage,
          limit,
          userId
        }
      })

      dispatch({ type: postTypes.SET_HAS_MORE, payload: postData.data.nextPage })
      dispatch({ type: postTypes.POSTS_FETCH_SUCCESS, payload: postData.data.post })

    } catch (e: any) {
      dispatch({ type: postTypes.POST_FETCH_ERROR, payload: e.response.data.message })
    }
  }
}

export const getAllPosts = (path: string, history: any) => {
  return async (dispatch: Dispatch<PostActionType>) => {
    try {
      dispatch({ type: postTypes.POST_FETCH })

      const postData = await $api.get<IPost[]>("/post/getAllPosts")

      dispatch({ type: postTypes.POSTS_FETCH_SUCCESS, payload: postData.data })

      history.push(path)
    } catch (e: any) {
      dispatch({ type: postTypes.POST_FETCH_ERROR, payload: e.response.data.message })
    }
  }
}

export const getLimitPosts = (currentPage: number, limit: number) => {
  return async (dispatch: Dispatch<PostActionType>) => {
    try {
      dispatch({ type: postTypes.POST_FETCH })

      const postData = await $api.get<IFetchPosts>("/post/getLimitPosts", {
        params: {
          currentPage,
          limit
        }
      })

      dispatch({ type: postTypes.SET_HAS_MORE, payload: postData.data.nextPage })
      dispatch({ type: postTypes.POSTS_FETCH_SUCCESS, payload: postData.data.post })

    } catch (e: any) {
      dispatch({ type: postTypes.POST_FETCH_ERROR, payload: e.response.data.message })
    }
  }
}

export const clearPostStore = () => {

  return { type: postTypes.CLEAR_POST_STORE }
}