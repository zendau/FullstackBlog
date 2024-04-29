export default defineNuxtRouteMiddleware(() => {
  const refreshToken = useCookie("JWTRefreshToken")
  const authStore = useAuthStore()

  if (!authStore.isAuth && refreshToken.value) {
    authStore.initJWT()
  }
})
