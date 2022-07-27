import { IPost } from './../../../interfaces/post';
import { ApiError } from '@/interfaces/api/ApiError';
import { mainApi } from '@/redux/api/base.api'
import { alertActions } from '@/redux/reducers/alert/alert.slice';
import { postActions } from '@/redux/reducers/post/post.slice';

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    createPost: build.mutation<IPost | ApiError, any>({
      query: (data) => ({
        url: '/post/create',
        method: 'POST',
        body: data
      }),
    }),
    editPost: build.mutation({
      query: (data) => ({
        url: '/post/edit',
        method: 'PATCH',
        body: data
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          console.log(getState, 'getState')
          const { data } = await queryFulfilled;
          console.log('data', data)
          // dispatch(postActions.fetchPost(data));
        } catch (e: any) {
          dispatch(alertActions.setError({
            message: e.error.data.message,
            type: 'error'
          }))
        }
      },
    }),
    deletePost: build.mutation({
      query: (postId) => ({
        url: `/post/delete/${postId}`,
        method: 'DELETE',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          console.log(getState, 'getState')
          const { data } = await queryFulfilled;
          console.log('data', data)
          // dispatch(postActions.fetchPost(data));
        } catch (e: any) {
          dispatch(alertActions.setError({
            message: e.error.data.message,
            type: 'error'
          }))
        }
      },
    }),
    getUserPosts: build.query({
      query: (postData: any) => ({
        url: '/post/getUserPosts/',
        params: {
          currentPage: postData.currentPage,
          limit: postData.limit,
          userId: postData.userId,
        }
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          console.log(getState, 'getState')
          const { data } = await queryFulfilled;
          console.log('data', data)
          dispatch(postActions.clearPost())
          dispatch(postActions.setHasMore(data.nextPage))
          dispatch(postActions.fetchPost(data.post))
        } catch (e: any) {
          dispatch(alertActions.setError({
            message: e.error.data.message,
            type: 'error'
          }))
        }
      }
    }),
    getLimitPosts: build.query({
      query: (postData: any) => ({
        url: '/post/getLimitPosts/',
        params: {
          currentPage: postData.currentPage,
          limit: postData.limit
        }
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          console.log(getState, 'getState')
          const { data } = await queryFulfilled;
          console.log('data', data)
          //dispatch(postActions.clearPost())
          dispatch(postActions.setHasMore(data.nextPage))
          dispatch(postActions.fetchPost(data.post))
        } catch (e: any) {
          dispatch(alertActions.setError({
            message: e.error.data.message,
            type: 'error'
          }))
        }
      }
    }),
    getAllPosts: build.query({
      query: () => ({
        url: '/post/getAllPosts/'
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          console.log(getState, 'getState')
          const { data } = await queryFulfilled;
          console.log('data', data)
          dispatch(postActions.clearPost())
          dispatch(postActions.fetchPost(data.post))
        } catch (e: any) {
          dispatch(alertActions.setError({
            message: e.error.data.message,
            type: 'error'
          }))
        }
      }
    }),
    getPost: build.query({
      query: (id: string) => ({
        url: `/post/get/${id}`
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          console.log(getState, 'getState')
          const { data } = await queryFulfilled;
          console.log('data', data)
          dispatch(postActions.getPost(data))
        } catch (e: any) {
          dispatch(alertActions.setError({
            message: e.error.data.message,
            type: 'error'
          }))
        }
      }
    }),
    setReaction: build.mutation({
      query: (reactionData: { isLiked: boolean | null, postId: string }) => ({
        url: '/post/reacting',
        method: 'PATCH',
        params: reactionData
      })
    }),
    addComment: build.mutation({
      query: (commentData: { postId: string, message: string}) => ({
        url: '/post/addComment',
        method: 'POST',
        body: commentData
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(postActions.addComment(data))
        } catch (e: any) {
          dispatch(alertActions.setError({
            message: e.error.data.message,
            type: 'error'
          }))
        }
      }
    }),
    editComment: build.mutation({
      query: (commentData: { commentId: string, newMessage: string}) => ({
        url: '/post/editComment',
        method: 'PUT',
        body: commentData
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(postActions.editComment(data))
        } catch (e: any) {
          dispatch(alertActions.setError({
            message: e.error.data.message,
            type: 'error'
          }))
        }
      }
    }),
    deleteComment: build.mutation({
      query: (commentData: { commentId: string }) => ({
        url: '/post/deleteComment',
        method: 'DELETE',
        body: commentData
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(postActions.deleteComment(data))
        } catch (e: any) {
          dispatch(alertActions.setError({
            message: e.error.data.message,
            type: 'error'
          }))
        }
      }
    })
  }),
  overrideExisting: false,
})

export const {
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useLazyGetUserPostsQuery,
  useLazyGetLimitPostsQuery,
  useGetAllPostsQuery,
  useLazyGetPostQuery,
  useSetReactionMutation,
  useAddCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation
} = extendedApi