enum Roles {
  User = "user",
  Admin = "admin",
}

interface IUser {
  id: string
  email: string
  roles: Roles
  isActivated: boolean
  isBlocked: boolean
}

interface ITokenBody {
  payload: IUser
  iat: number
  exp: number
}

export const useUserStore = defineStore("user", () => {
  const data = ref<IUser>()
  const isAdmin = computed(() => {
    if (!data.value) return false

    return data.value.roles.includes(Roles.Admin)
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
    return true
  }

  function $reset() {
    data.value = undefined
  }

  return { data, isAdmin, $reset, decodeToken, saveUserData }
})
