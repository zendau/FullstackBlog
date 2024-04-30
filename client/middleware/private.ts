export default defineNuxtRouteMiddleware(() => {
  const authState = useAuthStore()
  if (!authState.isAuth) {
    return navigateTo("/")
  }
})
