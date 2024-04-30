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

      localStorage.setItem("token", res.accessToken)
      isAuth.value = true
      await router.push("/")
    } catch (e: any) {
      if (e.status === 401) {
        error.value =
          "Пожалуйста, проверьте введенные данные и повторите попытку."
      } else {
        error.value =
          "Произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз позже."
      }

      setTimeout(() => (error.value = ""), 5000)
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

      localStorage.setItem("token", res.accessToken)
      isAuth.value = true
    } catch (e: any) {
      if (e.status === 400) {
        error.value = e.data.message
      } else if (e.status === 401) {
        error.value =
          "Пожалуйста, проверьте введенные данные и повторите попытку."
      } else {
        error.value =
          "Произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз позже."
      }

      setTimeout(() => (error.value = ""), 5000)
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

    localStorage.setItem("token", accessToken)
  }

  function logout() {
    isAuth.value = false
    localStorage.setItem("token", "")

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

      localStorage.setItem("token", res.accessToken)
      isAuth.value = true
      await router.push("/")
    } catch (e: any) {
      if (e.status === 401) {
        error.value =
          "Пожалуйста, проверьте введенные данные и повторите попытку."
      } else {
        error.value =
          "Произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз позже."
      }

      setTimeout(() => (error.value = ""), 5000)
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
