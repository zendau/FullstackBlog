import { mainApi } from '../api/base.api'
import { setError } from './user.slice';

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
        } catch (error: any) {
          dispatch(setError(error.error.data.message));
          console.log('error', error)
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { useRegisterUserMutation } = extendedApi