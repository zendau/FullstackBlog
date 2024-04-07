export default defineNuxtRouteMiddleware((to, from) => {
  console.log("middleware after global", to, from)
})
