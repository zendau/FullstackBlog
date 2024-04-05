interface IAuthUser {
  email: string
  password: string
}

export const useAuthStore = defineStore("auth", () => {
  const loadingIndicator = useLoadingIndicator()
  const router = useRouter()

  const localStorage = useLocalStorage("token", "")

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
      localStorage.value = token.value
      router.push("/")
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

  return { isLoading, token, error, login }
})

// export const useAuthStore = defineStore("auth", {
//   state: () => ({
//     isLoading: false,
//     data: [],
//     error: "",
//   }),
//   actions: {
//     async login(userData: IAuthUser) {
//       const loadingIndicator = useLoadingIndicator()
//       try {
//         this.isLoading = true
//         loadingIndicator.start()
//         const res = await $fetch<any>(
//           "https://api.fakestorejson.com/api/v1/auth/login",
//           {
//             method: "post",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               email: userData.email,
//               password: userData.password,
//             }),
//           },
//         )
//         this.data = res
//       } catch (e: any) {
//         if (e.status === 401) {
//           this.error =
//             "Пожалуйста, проверьте введенные данные и повторите попытку."
//         } else {
//           this.error =
//             "Произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз позже."
//         }

//         setTimeout(() => (this.error = ""), 5000)
//       } finally {
//         loadingIndicator.finish()
//         this.isLoading = false
//       }
//     },
//   },
// })
