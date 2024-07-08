export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore()

  if (!userStore.data?.isActivated) {
    return navigateTo({ path: "/unavailable", query: { type: "activate" } })
  }

  if (userStore.data.isBlocked) {
    return navigateTo({ path: "/unavailable", query: { type: "blocked" } })
  }
})
