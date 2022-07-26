import { IUser } from '@/redux/interfaces/types';
import { mainApi } from '@/redux/api/base.api'
import { alertActions } from '@/redux/reducers/alert/alert.slice';
import { userActions } from '@/redux/reducers/user/user.slice';
import jwt from 'jwt-decode'

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (data) => ({
        url: '/user/register',
        method: 'POST',
        body: data
      }),
      //transformResponse: (result: any) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const tokenDecode: any = jwt(data.accessToken)
          localStorage.setItem("token", data.accessToken)
          console.log('tokenDecode', tokenDecode)
          dispatch(userActions.setUser(tokenDecode.payload));
        } catch (e: any) {
          dispatch(alertActions.setError({
            message: e.error.data.message,
            type: 'error'
          }));
          console.log('error', e)
        }
      },
    }),
    loginUser: build.mutation({
      query: (data) => ({
        url: '/user/login',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const tokenDecode: any = jwt(data.accessToken)
          localStorage.setItem("token", data.accessToken)
          dispatch(userActions.setUser(tokenDecode.payload));
        } catch (e: any) {
          dispatch(alertActions.setError({
            message: e.error.data.message,
            type: 'error'
          }));
        }
      },
    }),
    logoutUser: build.mutation({
      query: () => ({
        url: '/user/logout',
        method: 'GET'
      }),
      async onQueryStarted(args: void, { dispatch, queryFulfilled }) {
        debugger
        try {
          await queryFulfilled;
          localStorage.removeItem("token")
          dispatch(userActions.logout())
        } catch (e: any) {
          dispatch(alertActions.setError({
            message: e.error.data.message,
            type: 'error'
          }));
        }
      }
    }),
    setConfirmCode: build.mutation({
      query: (data) => ({
        url: '/user/setConfirmCode',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(args: void, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          dispatch(alertActions.setError({
            message: e.error.data.message,
            type: 'error'
          }));
        }
      }
    }),
    resetPassword: build.mutation({
      query: (data) => ({
        url: '/user/resetPassword',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(args: void, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(alertActions.setError({
            message: data,
            type: 'success'
          }));
        } catch (e: any) {
          dispatch(alertActions.setError({
            message: e.error.data.message,
            type: 'error'
          }));
        }
      }
    }),
    editUserData: build.mutation({
      query: (data) => ({
        url: '/user/saveNewData',
        method: 'PUT',
        body: data
      }),
      async onQueryStarted(args: void, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const tokenDecode: any = jwt(data.accessToken)
          localStorage.setItem("token", data.accessToken)
          dispatch(userActions.setUser(tokenDecode.payload));
          dispatch(alertActions.setError({
            message: 'Data updated successfully',
            type: 'success'
          }))
        } catch (e: any) {
          dispatch(alertActions.setError({
            message: e.error.data.message,
            type: 'error'
          }));
        }
      }
    }),
    getUsers: build.query<IUser[], void>({
      query: () => ({
        url: '/user/all'
      })
    }),
  }),
  overrideExisting: false,
})

export const { 
  useRegisterUserMutation, 
  useLoginUserMutation, 
  useLogoutUserMutation,
  useResetPasswordMutation,
  useSetConfirmCodeMutation,
  useEditUserDataMutation,
  useGetUsersQuery
} = extendedApi