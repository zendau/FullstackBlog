export const useUserStore = defineStore("user", () => {
  const data = ref<any>([])
  const error = ref("")
  const isAuth = ref(false)

  const isAdmin = ref(false)

  const router = useRouter()
  const refreshToken = useLocalStorage("token", "")
  const accessToken = useCookie("token")

  function parseToken() {
    console.log("parse isAdmin status")

    if (!accessToken.value) return false

    try {
      const parts = accessToken.value.split(".")
      const payload = JSON.parse(atob(parts[1]))

      if (!payload && !payload.prv) return false

      isAdmin.value = true
      isAuth.value = true
      return true
    } catch (e) {
      console.log("parse error", e)
      return false
    }
  }

  async function getProfile() {
    try {
      const res: any = await useApiFetch("auth/user-profile", {
        method: "get",
      })

      console.log("get")
      data.value = res
      data.value.roles = ["admin"]
      isAuth.value = true

      if (data.value.roles.includes("admin")) isAdmin.value = true

      return true
    } catch (e) {
      error.value = "invalid user data"
      console.log("E", e)
      logout()
      return false
    }
  }

  function logout() {
    console.log("logout")
    isAuth.value = false
    isAdmin.value = false
    router.push("/")
    refreshToken.value = ""
    accessToken.value = ""
    data.value = []
  }

  return { data, error, isAuth, isAdmin, getProfile, logout, parseToken }
})
