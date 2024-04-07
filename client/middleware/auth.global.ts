export default defineNuxtRouteMiddleware(async () => {
  const token = useCookie("token")
  const userStore = useUserStore()

  if (token.value && !userStore.isAuth) {
    await userStore.getProfile()
  }
})
