export default defineNuxtRouteMiddleware(() => {
  const userState = useUserStore()

  if (!userState.isAdmin) {
    return abortNavigation(
      createError({ statusCode: 404, statusMessage: "Page Not Found" }),
    )
  }

  // console.log(import.meta.server, import.meta.client, userState.isAdmin)
  // if (import.meta.server) return

  // if (userState.isAdmin) {
  //   return navigateTo("/")
  // }

  // console.log("start", userState.isAdmin)

  // if (import.meta.client && userState.isAdmin) {
  //   return abortNavigation()
  // }

  // if (import.meta.client) {
  // }

  // if (import.meta.server) {
  //   return navigateTo("/")
  // }

  // if (!userState.isAdmin) {
  //   return navigateTo("/")
  //   // return createError({ statusCode: 404, statusMessage: "Page Not Found" })
  // }
  // console.log("end")
})
