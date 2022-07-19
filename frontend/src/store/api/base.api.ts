import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080', 
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    //const token = (getState() as RootState).auth.token
    const token = 'test'
    if (token) {
      headers.set('authentication', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery('/refreshToken', api, extraOptions)
    if (refreshResult.data) {
      // store the new token
      //api.dispatch(tokenReceived(refreshResult.data))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      //api.dispatch(loggedOut())
    }
  }
  return result
}


export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: baseQueryWithReauth,
  refetchOnFocus: true,
  endpoints: build => ({})
})
