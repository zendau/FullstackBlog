import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { userActions } from "@/redux/reducers/user/user.slice"

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('token')
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
    const refreshResult = await baseQuery('/user/refresh', api, extraOptions)
    if (refreshResult.data) {
      const { accessToken } : any = refreshResult.data
      localStorage.setItem('token', accessToken)
      result = await baseQuery(args, api, extraOptions)
    } else {
      console.log('user is not login')
      api.dispatch(userActions.logout())
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
