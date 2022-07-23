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
      async onQueryStarted(args: void, { dispatch, queryFulfilled}) {
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
    })
  }),
  overrideExisting: false,
})

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation } = extendedApi