export const useUserStore = defineStore("user", () => {
  const data = ref<any>([])
  const error = ref("")
  const isAuth = ref(false)

  const isAdmin = ref(false)

  const router = useRouter()
  const tokenStorage = useLocalStorage("token", "")
  const tokenCookie = useCookie("token")

  async function getProfile() {
    try {
      const res: any = await useFetchJWT("auth/user-profile", {
        method: "get",
      })

      data.value = res
      data.value.roles = ["admin"]
      isAuth.value = true

      if (data.value.roles.includes("admin")) isAdmin.value = true

      return true
    } catch (e) {
      error.value = "invalid user data"
      logout()
      return false
    }
  }

  function logout() {
    isAuth.value = false
    isAdmin.value = false
    router.push("/")
    tokenStorage.value = ""
    tokenCookie.value = ""
    data.value = []
  }

  return { data, error, isAuth, isAdmin, getProfile, logout }
})
