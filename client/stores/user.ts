export const useUserStore = defineStore("user", () => {
  const data = ref([])
  const error = ref("")
  const isAuth = ref(false)

  async function getProfile() {
    try {
      const res: any = await useFetchJWT("auth/user-profile", {
        method: "get",
      })

      data.value = res
      isAuth.value = true
      return true
    } catch (e) {
      error.value = "invalid user data"
      isAuth.value = false
      return false
    }
  }

  return { data, error, isAuth, getProfile }
})
