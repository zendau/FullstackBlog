export default defineNuxtRouteMiddleware(async () => {
  const token = useCookie("token")
  const userStore = useUserStore()

  if (token.value) {
    userStore.isAuth = true
  }

  if (import.meta.server) return

  console.log("storage", localStorage.getItem("token"))

  if (token.value && !userStore.isAuth) {
    await userStore.getProfile()
  }
})
