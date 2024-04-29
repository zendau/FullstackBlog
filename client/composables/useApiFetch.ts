import { defu } from "defu"
import type { NitroFetchRequest } from "nitropack"

type $FetchType = typeof $fetch
export type ReqOptions = Parameters<$FetchType>[1]

export function useApiFetch<T>(
  url: NitroFetchRequest,
  options: ReqOptions = {},
) {
  const token = useCookie("token")

  const authStore = useAuthStore()
  const toast = useToast()

  const defaults: ReqOptions = {
    baseURL: import.meta.env.VITE_API,
    headers: authStore.isAuth
      ? { Authorization: `Bearer ${authStore.accessToken}` }
      : {},

    retry: 1,
    retryStatusCodes: [401],
    credentials: "include",
    onRequest: (ctx) => {
      ctx.options.headers = new Headers({
        Authorization: `Bearer ${token.value}`,
      })
    },
    onResponseError: async (ctx) => {
      if (ctx.response.status === 401) {
        try {
          const res: any = await fetchApi("auth/refresh-token", {
            method: "post",
          })
          token.value = res.access_token
        } catch (e) {
          if (import.meta.client) {
            toast.add({ title: "Unexpected error. Try later" })
          }
          authStore.logout()
        }
      }
    },
  }

  const params = defu(options, defaults)

  const fetchApi = $fetch.create(params)

  return fetchApi<T>(url, options)
}
