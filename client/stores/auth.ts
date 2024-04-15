interface IAuthUser {
  email: string
  password: string
}

export const useAuthStore = defineStore("auth", () => {
  const loadingIndicator = useLoadingIndicator()
  const router = useRouter()

  const accessToken = useCookie("token")
  const refreshToken = useLocalStorage("token", "")

  const userStore = useUserStore()

  const isLoading = ref(false)
  const token = ref("")
  const error = ref("")

  async function login(userData: IAuthUser) {
    try {
      isLoading.value = true
      loadingIndicator.start()
      const res = await $fetch<any>(
        "https://api.fakestorejson.com/api/v1/auth/login",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
          }),
        },
      )

      if (!res.access_token) {
        throw Error
      }

      token.value = res.access_token
      accessToken.value = token.value
      refreshToken.value = token.value

      await userStore.getProfile()

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

  return { isLoading, token, error, accessToken, refreshToken, login }
})
