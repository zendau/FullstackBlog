export function useFetchJWT(url: any, options: any) {
  const token = useCookie("token")

  const fetchJWT = $fetch.create({
    baseURL: "https://api.fakestorejson.com/api/v1/",
    retry: 1,
    retryStatusCodes: [401],
    onRequest: (ctx) => {
      ctx.options.headers = new Headers({
        Authorization: `Bearer ${token.value}`,
      })
    },
    onResponseError: async (ctx) => {
      if (ctx.response.status === 401) {
        try {
          const res: any = await fetchJWT("auth/refresh-token", {
            method: "post",
          })
          token.value = res.access_token
        } catch (e) {
          // TODO: logout
        }
      }
    },
  })

  return fetchJWT(url, options)
}
