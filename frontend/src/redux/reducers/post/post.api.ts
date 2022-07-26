import { ApiError } from '@/redux/interfaces/ApiError';
import { mainApi } from '@/redux/api/base.api'
import { alertActions } from '@/redux/reducers/alert/alert.slice';
import { postActions } from '@/redux/reducers/post/post.slice';

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    createPost: build.mutation<void | ApiError, any>({
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
  useGetAllPostsQuery  
} = extendedApi