export default defineNuxtRouteMiddleware(async () => {
  const accessToken = useCookie("token")
  const userStore = useUserStore()

  if (accessToken.value) {
    userStore.parseToken()
  }

  if (import.meta.server) return

  const refreshToken = useLocalStorage("token", "")

  if (!accessToken.value && !refreshToken.value) return
  await userStore.getProfile()
})
