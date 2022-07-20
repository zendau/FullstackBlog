import { mainApi } from '../../api/base.api'
import {  alertActions } from '../alert/alert.slice';

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (data) => ({
        url: '/user/register',
        method: 'POST',
        body: data
      }),
      transformResponse: () => {

      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          //dispatch(setUser(data));
          console.log('success', data)
        } catch (e: any) {
          dispatch(alertActions.setError({
            message: e.error.data.message,
            type: 'error'
          }));
          console.log('error', e)
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { useRegisterUserMutation } = extendedApi