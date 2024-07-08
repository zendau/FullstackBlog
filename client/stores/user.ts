export enum Roles {
  User = "user",
  Admin = "admin",
}

interface IUpdatehUser {
  email?: string
  password?: string
  confirmCode: string
}

export interface IUser {
  id: string
  email: string
  isActivated: boolean
  isBlocked: boolean
  roles: Roles[]
}

interface ITokenBody {
  payload: IUser
  iat: number
  exp: number
}

interface IAuthRes {
  accessToken: string
  refreshToken: string
}

export const useUserStore = defineStore("user", () => {
  const data = ref<IUser>()
  const isAdmin = computed(() => {
    if (!data.value) return false

    return data.value.roles.includes(Roles.Admin)
  })

  const isLoading = ref(false)
  const error = ref("")

  watch(error, () => {
    setTimeout(() => (error.value = ""), 5000)
  })

  function decodeToken(token: string) {
    if (!token) return false

    try {
      const parts = token.split(".")
      const tokenBody: ITokenBody = JSON.parse(atob(parts[1]))

      if (!tokenBody || !tokenBody.payload) return false
      return tokenBody
    } catch (e) {
      return false
    }
  }

  function saveUserData(token: string) {
    const decodeData = decodeToken(token)

    if (!decodeData) return false
    data.value = decodeData.payload

    if (process.client) {
      localStorage.setItem("token", token)
    }

    return true
  }

  async function activateAccount({ confirmCode }: { confirmCode: string }) {
    try {
      error.value = ""
      isLoading.value = true
      const res = await useApiFetch<boolean>("/user/activate", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          confirmCode,
        }),
      })

      if (!res || !data.value) throw Error

      data.value.isActivated = true
      return true
    } catch (e: any) {
      error.value = "An error occurred when activating account. Repeat later."

      return false
    } finally {
      isLoading.value = false
    }
  }

  async function sendConfirmCode(email: string | undefined) {
    try {
      error.value = ""
      isLoading.value = true
      if (!email) throw new Error("The email was not entered")

      const res = await useApiFetch<boolean>("/user/sendConfirmCode", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
        }),
      })

      if (!res) throw Error
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
      isLoading.value = false
    }
  }

  async function resetPassword({
    email,
    confirmCode,
  }: {
    email: string
    confirmCode: string
  }) {
    try {
      error.value = ""
      isLoading.value = true
      const res = await useApiFetch<{ message: string }>(
        "/user/resetPassword",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            confirmCode,
          }),
        },
      )

      if (!res) throw Error
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
      isLoading.value = false
    }
  }

  async function updateUserData({
    email,
    password,
    confirmCode,
  }: IUpdatehUser) {
    try {
      error.value = ""
      isLoading.value = true
      const res = await useApiFetch<IAuthRes>("/user/saveNewData", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: confirmCode,
          ...(email && { newEmail: email }),
          ...(password && { newPassword: password }),
        }),
      })

      const saveStatus = saveUserData(res.accessToken)

      if (!saveStatus) {
        throw Error
      }
      return true
    } catch (e: any) {
      error.value =
        e.data.message ??
        "An error occurred when sending the confirmation code. Repeat later."

      return false
    } finally {
      isLoading.value = false
    }
  }

  function $reset() {
    data.value = undefined

    isLoading.value = false
    error.value = ""
  }

  return {
    data,
    error,
    isAdmin,
    isLoading,
    $reset,
    decodeToken,
    saveUserData,
    resetPassword,
    updateUserData,
    activateAccount,
    sendConfirmCode,
  }
})
