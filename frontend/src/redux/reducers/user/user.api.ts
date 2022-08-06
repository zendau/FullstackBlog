import { IUserData } from './../../../interfaces/IUserData';
import { IUpdateUserRequest } from './../../../interfaces/api/user/IUpdateUserRequest';
import { isApiError } from '@/utils/isApiError';
import { IUserResponse } from '@/interfaces/api/user/IUserResponse';
import { IUserRequest } from '@/interfaces/api/user/IUserRequest';
import { IUser } from '@/interfaces/IUser';
import { mainApi } from '@/redux/api/base.api'
import { alertActions } from '@/redux/reducers/alert/alert.slice';
import { userActions } from '@/redux/reducers/user/user.slice';
import jwt from 'jwt-decode'
import { ApiError } from '@/interfaces/api/ApiError';

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<IUserResponse | ApiError, IUserRequest>({
      query: (data) => ({
        url: '/user/register',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (!isApiError(data)) {
            const tokenDecode: any = jwt(data.accessToken)
            localStorage.setItem("token", data.accessToken)

            dispatch(userActions.setUser(tokenDecode.payload));
          }

        } catch (e: any) {
          dispatch(alertActions.setError({
            message: e.error.data.message,
            type: 'error'
          }));
        }
      },
    }),
    loginUser: build.mutation<IUserResponse | ApiError, IUserRequest>({
      query: (data) => ({
        url: '/user/login',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (!isApiError(data)) {
            const tokenDecode: any = jwt(data.accessToken)
            localStorage.setItem("token", data.accessToken)
            dispatch(userActions.setUser(tokenDecode.payload));
          }

        } catch (e: any) {
          dispatch(alertActions.setError({
            message: e.error.data.message,
            type: 'error'
          }));
        }
      },
    }),
    logoutUser: build.mutation<void | ApiError, void>({
      query: () => ({
        url: '/user/logout',
        method: 'GET'
      }),
      async onQueryStarted(args: void, { dispatch, queryFulfilled }) {
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
    setConfirmCode: build.mutation<void | ApiError, { email: string }>({
      query: (data) => ({
        url: '/user/setConfirmCode',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
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
    resetPassword: build.mutation<{ message: string } | ApiError, { confirmCode: string, email: string }>({
      query: (data) => ({
        url: '/user/resetPassword',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (!isApiError(data)) {
            dispatch(alertActions.setError({
              message: data.message,
              type: 'success'
            }));
          }

        } catch (e: any) {
          dispatch(alertActions.setError({
            message: e.error.data.message,
            type: 'error'
          }));
        }
      }
    }),
    editUserData: build.mutation<IUserResponse | ApiError, IUpdateUserRequest>({
      query: (data) => ({
        url: '/user/saveNewData',
        method: 'PUT',
        body: data
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (!isApiError(data)) {
            const tokenDecode: any = jwt(data.accessToken)
            localStorage.setItem("token", data.accessToken)

            dispatch(userActions.setUser(tokenDecode.payload));
            dispatch(alertActions.setError({
              message: 'Data updated successfully',
              type: 'success'
            }))
          }
         
        } catch (e: any) {
          dispatch(alertActions.setError({
            message: e.error.data.message,
            type: 'error'
          }));
        }
      }
    }),
    getUsers: build.query<IUser[] | ApiError, void>({
      query: () => ({
        url: '/user/all'
      })
    }),
    getUser: build.query<IUserData | ApiError, string>({
      query: (userId) => ({
        url: `/user/data/${userId}`
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
  useGetUsersQuery,
  useGetUserQuery
} = extendedApi