import { Roles } from "./user"

interface IFetchParam {
  substring?: string
}

interface IFetch {
  isRewrite?: boolean
  params?: IFetchParam
}

interface IUserFetch {
  list: IUser[]
  total: number
  hasMore: boolean
}

export const useAdminStore = defineStore("admin", () => {
  const data = ref<IUser[]>([])

  const isLoading = ref(false)
  const error = ref("")

  const page = ref(1)
  const count = ref(2)
  const total = ref(0)

  const hasMore = ref(true)

  watch(error, () => {
    setTimeout(() => (error.value = ""), 5000)
  })

  async function fetch({ isRewrite, params }: IFetch = {}) {
    isLoading.value = true

    if (isRewrite) {
      data.value = []
    }

    try {
      const res = await useApiFetch<IUserFetch>("user/pagination", {
        query: {
          limit: count.value,
          page: page.value - 1,
          ...params,
        },
      })

      if (!res) {
        error.value = "Error receiving user list. Try later"
        return
      }

      if (res.total) {
        total.value = res.total
      }

      if (!res.hasMore) {
        hasMore.value = false
      }

      data.value.push(...res.list)

      return true
    } catch (e) {
      error.value = "Unexpected error. Try later"
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function setUserRoles(id: string, roles: Roles[]) {
    isLoading.value = true

    try {
      const res = await useApiFetch<IUserFetch>("admin/setRoles", {
        method: "patch",
        body: {
          userId: id,
          roles,
        },
      })

      if (!res) {
        error.value = "Error updated user role. Try later"
        return
      }

      return true
    } catch (e) {
      error.value = "Unexpected error. Try later"
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function blockUser(id: string) {
    isLoading.value = true

    try {
      const res = await useApiFetch<IUserFetch>("admin/block", {
        method: "patch",
        body: {
          userId: id,
        },
      })

      if (!res) {
        error.value = "Error set block status. Try later"
        return
      }

      return true
    } catch (e) {
      error.value = "Unexpected error. Try later"
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function unBlockUser(id: string) {
    isLoading.value = true

    try {
      const res = await useApiFetch<IUserFetch>("admin/unBlock", {
        method: "patch",
        body: {
          userId: id,
        },
      })

      if (!res) {
        error.value = "Error set unblock status. Try later"
        return
      }

      return true
    } catch (e) {
      error.value = "Unexpected error. Try later"
      return false
    } finally {
      isLoading.value = false
    }
  }

  function $reset() {
    data.value = []

    isLoading.value = false
    error.value = ""

    page.value = 1
    count.value = 2
    total.value = 0

    hasMore.value = true
  }

  return {
    data,
    page,
    count,
    total,
    error,
    isLoading,
    fetch,
    $reset,
    blockUser,
    unBlockUser,
    setUserRoles,
  }
})
