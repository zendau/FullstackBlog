import { defu } from "defu"
import type { NitroFetchRequest } from "nitropack"

type $FetchType = typeof $fetch
export type ReqOptions = Parameters<$FetchType>[1]

export async function useJWTRefesh() {
  const authStore = useAuthStore()
  try {
    const res: any = await $fetch("user/refresh", {
      method: "post",
      baseURL: import.meta.env.VITE_API,
      credentials: "include",
    })
    authStore.refresh(res.accessToken)
  } catch (e) {
    authStore.logout()
  }
}

export function useApiFetch<T>(
  url: NitroFetchRequest,
  options: ReqOptions = {},
) {
  const authStore = useAuthStore()

  const defaultParams: ReqOptions = {
    baseURL: import.meta.env.VITE_API,
    credentials: "include",
    retry: 1,
    retryStatusCodes: [401],
    onRequest: (ctx) => {
      const token = process.client ? localStorage.getItem("token") : ""
      if (authStore.isAuth) {
        ctx.options.headers = new Headers({
          Authorization: `Bearer ${token}`,
        })
      }
    },
  }

  const fetchParams: ReqOptions = {
    ...defaultParams,
    onResponseError: (ctx) => {
      if (ctx.response.status === 401) {
        useJWTRefesh()
      }
    },
  }

  const params = defu(options, fetchParams)

  const fetchApi = $fetch.create(params)

  return fetchApi<T>(url, options)
}
