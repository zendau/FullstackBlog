export const useUserStore = defineStore("user", () => {
  const data = ref([])
  const error = ref("")
  const isAuth = ref(false)

  const router = useRouter()
  const tokenStorage = useLocalStorage("token", "")
  const tokenCookie = useCookie("token")

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

  function logout() {
    isAuth.value = false
    router.push("/")
    tokenStorage.value = ""
    tokenCookie.value = ""
    data.value = []
  }

  return { data, error, isAuth, getProfile, logout }
})
