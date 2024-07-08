interface IAuthUser {
  email: string
  password: string
}

interface IAuthRes {
  accessToken: string
  refreshToken: string
}

export const useAuthStore = defineStore("auth", () => {
  const loadingIndicator = useLoadingIndicator()
  const router = useRouter()

  const refreshToken = useCookie("JWTRefreshToken")

  const userStore = useUserStore()

  const isLoading = ref(false)
  const error = ref("")

  const isAuth = ref(false)

  watch(error, () => {
    setTimeout(() => (error.value = ""), 5000)
  })

  async function login(userData: IAuthUser) {
    try {
      error.value = ""
      isLoading.value = true
      loadingIndicator.start()
      const res = await useApiFetch<IAuthRes>("/user/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      })

      const saveStatus = userStore.saveUserData(res.accessToken)

      if (!saveStatus) {
        throw Error
      }

      isAuth.value = true
      await router.push("/")
    } catch (e: any) {
      const errorBody = e.response
      if (errorBody.status === 400 && errorBody._data.message) {
        error.value = errorBody._data.message
      } else {
        error.value = "Unexpected error has occurred. Please try again later"
      }
    } finally {
      loadingIndicator.finish()
      isLoading.value = false
    }
  }

  async function register(userData: IAuthUser) {
    try {
      error.value = ""
      isLoading.value = true
      loadingIndicator.start()
      const res = await useApiFetch<IAuthRes>("/user/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      })

      const saveStatus = userStore.saveUserData(res.accessToken)

      if (!saveStatus) {
        throw Error
      }

      isAuth.value = true
      return true
    } catch (e: any) {
      const errorBody = e.response
      if (errorBody.status === 400 && errorBody._data.message) {
        error.value = errorBody._data.message
      } else {
        error.value = "Unexpected error has occurred. Please try again later"
      }
      return false
    } finally {
      loadingIndicator.finish()
      isLoading.value = false
    }
  }

  function initJWT() {
    if (!refreshToken.value) {
      return false
    }

    const saveStatus = userStore.saveUserData(refreshToken.value)
    isAuth.value = true
    return saveStatus
  }

  function refresh(accessToken: string) {
    const saveStatus = userStore.saveUserData(accessToken)

    if (!saveStatus) {
      throw Error
    }

    if (process.client) {
      localStorage.setItem("token", accessToken)
    }
  }

  function logout() {
    isAuth.value = false

    if (process.client) {
      localStorage.setItem("token", "")
    }

    userStore.$reset()
    useApiFetch("/user/logout")

    router.push("/")
  }

  async function resetPassword({ email }: { email: string }) {
    try {
      error.value = ""
      isLoading.value = true
      loadingIndicator.start()
      const res = await useApiFetch<IAuthRes>("/user/resetPassword", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
        }),
      })

      const saveStatus = userStore.saveUserData(res.accessToken)

      if (!saveStatus) {
        throw Error
      }

      isAuth.value = true
      await router.push("/")
    } catch (e: any) {
      const errorBody = e.response
      if (errorBody.status === 400 && errorBody.statusText) {
        error.value = errorBody.statusText
      } else {
        error.value = "Unexpected error has occurred. Please try again later"
      }
    } finally {
      loadingIndicator.finish()
      isLoading.value = false
    }
  }

  return {
    error,
    isAuth,
    isLoading,
    login,
    logout,
    refresh,
    initJWT,
    register,
    resetPassword,
  }
})
