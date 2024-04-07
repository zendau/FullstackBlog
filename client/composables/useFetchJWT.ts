export function useFetchJWT<T>(
  url: string | (() => string),
  options: {
    method: "get" | "post" | "put" | "patch" | "delete"
  },
) {
  const token = useCookie("token")
  return $fetch<T>(`https://api.fakestorejson.com/api/v1/${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  })
}
