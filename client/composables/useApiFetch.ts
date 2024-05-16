import { defu } from "defu"
import type { NitroFetchRequest } from "nitropack"

type $FetchType = typeof $fetch
export type ReqOptions = Parameters<$FetchType>[1]

export function useApiFetch<T>(
  url: NitroFetchRequest,
  options: ReqOptions = {},
) {
  const authStore = useAuthStore()

  const token = process.client ? localStorage.getItem("token") : ""

  const defaults: ReqOptions = {
    baseURL: "http://localhost:8080",
    retry: 1,
    retryStatusCodes: [401],
    credentials: "include",
    onRequest: (ctx) => {
      if (authStore.isAuth) {
        ctx.options.headers = new Headers({
          Authorization: `Bearer ${token}`,
        })
      }
    },
    onResponseError: async (ctx) => {
      if (ctx.response.status === 401) {
        try {
          const res: any = await fetchApi("user/refresh", {
            method: "post",
          })
          authStore.refresh(res.accessToken)
        } catch (e) {
          authStore.logout()
        }
      }
    },
  }

  const params = defu(options, defaults)

  const fetchApi = $fetch.create(params)

  return fetchApi<T>(url, options)
}
