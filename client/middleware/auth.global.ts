export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()

  if (import.meta.server && !authStore.isAuth) {
    console.log("Previous tokens")
    authStore.initJWT()
    return
  }
  const nuxtApp = useNuxtApp()
  if (
    import.meta.client &&
    authStore.isAuth &&
    nuxtApp.isHydrating &&
    nuxtApp.payload.serverRendered
  ) {
    console.log("New tokens")
    useJWTRefesh()
  }
})
