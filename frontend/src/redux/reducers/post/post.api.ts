import { ICommentRequest } from '@/interfaces/api/post/ICommentRequest';
import { IReactionRequest } from '@/interfaces/api/post/IReactionRequest';
import { IPostLimitResponse } from '@/interfaces/api/post/IPostLimitResponse';
import { IPost } from '@/interfaces/IPost';
import { ApiError } from '@/interfaces/api/ApiError';
import { mainApi } from '@/redux/api/base.api'
import { alertActions } from '@/redux/reducers/alert/alert.slice';
import { postActions } from '@/redux/reducers/post/post.slice';
import { IPostRequest } from '@/interfaces/api/post/IPostRequest'
import { IPostLimitRequest } from '@/interfaces/api/post/IPostLimitRequest';
import { IComment } from '@/interfaces/IComment';
import { isApiError } from '@/utils/isApiError';


const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    createPost: build.mutation<IPost | ApiError, IPostRequest>({
      query: (data) => ({
        url: '/post/create',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          dispatch(alertActions.setAlert({
            message: e.error.data.message,
            type: 'error'
          }))
        }
      },
    }),
    editPost: build.mutation<IPost | ApiError, IPostRequest>({
      query: (data) => ({
        url: '/post/edit',
        method: 'PATCH',
        body: data
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          dispatch(alertActions.setAlert({
            message: e.error.data.message,
            type: 'error'
          }))
        }
      },
    }),
    deletePost: build.mutation<IPost | ApiError, string>({
      query: (postId) => ({
        url: `/post/delete/${postId}`,
        method: 'DELETE',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          dispatch(alertActions.setAlert({
            message: e.error.data.message,
            type: 'error'
          }))
        }
      },
    }),
    getLimitUserPosts: build.query<IPostLimitResponse | ApiError, IPostLimitRequest>({
      query: (postData) => ({
        url: '/post/getUserPosts/',
        params: {
          currentPage: postData.currentPage,
          limit: postData.limit,
          userId: postData.userId,
        }
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (!isApiError(data)) {
            dispatch(postActions.setHasMore(data.nextPage))
            dispatch(postActions.fetchPosts(data.posts))
          }
        } catch (e: any) {
          dispatch(alertActions.setAlert({
            message: e.error.data.message,
            type: 'error'
          }))
        }
      }
    }),
    getLimitPosts: build.query<IPostLimitResponse | ApiError, IPostLimitRequest>({
      query: (postData) => ({
        url: '/post/getLimitPosts/',
        params: {
          currentPage: postData.currentPage,
          limit: postData.limit
        }
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (!isApiError(data)) {
            dispatch(postActions.setHasMore(data.nextPage))
            dispatch(postActions.fetchPosts(data.posts))
          }
        } catch (e: any) {
          dispatch(alertActions.setAlert({
            message: e.error.data.message,
            type: 'error'
          }))
        }
      }
    }),
    getAllPosts: build.query<{ posts: IPost[] } | ApiError, void>({
      query: () => ({
        url: '/post/getAllPosts/'
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (!isApiError(data)) {
            dispatch(postActions.clearPosts())
            dispatch(postActions.fetchPosts(data.posts))
          }

        } catch (e: any) {
          dispatch(alertActions.setAlert({
            message: e.error.data.message,
            type: 'error'
          }))
        }
      }
    }),
    getPost: build.query<IPost | ApiError, string>({
      query: (id) => ({
        url: `/post/get/${id}`
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(postActions.setPost(data as IPost))
        } catch (e: any) {
          dispatch(alertActions.setAlert({
            message: e.error.data.message,
            type: 'error'
          }))
        }
      }
    }),
    setReaction: build.mutation<boolean | ApiError, IReactionRequest>({
      query: (reactionData) => ({
        url: '/post/reacting',
        method: 'PATCH',
        params: reactionData
      })
    }),
    addComment: build.mutation<IComment | ApiError, ICommentRequest>({
      query: (commentData) => ({
        url: '/post/addComment',
        method: 'POST',
        body: commentData
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          
          if (!isApiError(data)) {
            dispatch(postActions.addComment(data))
          }
          
        } catch (e: any) {
          dispatch(alertActions.setAlert({
            message: e.error.data.message,
            type: 'error'
          }))
        }
      }
    }),
    editComment: build.mutation<IComment | ApiError, ICommentRequest>({
      query: (commentData) => ({
        url: '/post/editComment',
        method: 'PUT',
        body: commentData
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (!isApiError(data)) {
            dispatch(postActions.editComment(data))
          }
        } catch (e: any) {
          dispatch(alertActions.setAlert({
            message: e.error.data.message,
            type: 'error'
          }))
        }
      }
    }),
    deleteComment: build.mutation<IComment | ApiError, { commentId: string }>({
      query: (commentData) => ({
        url: '/post/deleteComment',
        method: 'DELETE',
        body: commentData
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (!isApiError(data)) {
            dispatch(postActions.deleteComment(data))
          }
        
        } catch (e: any) {
          dispatch(alertActions.setAlert({
            message: e.error.data.message,
            type: 'error'
          }))
        }
      }
    }),
    searchPosts: build.query<IPost[] | ApiError, string>({
      query: (substring) => ({
        url: `/post/search/${substring}`
      })
    })
  }),
  overrideExisting: false,
})

export const {
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useLazyGetLimitUserPostsQuery,
  useLazyGetLimitPostsQuery,
  useGetAllPostsQuery,
  useLazyGetPostQuery,
  useSetReactionMutation,
  useAddCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
  useSearchPostsQuery
} = extendedApi