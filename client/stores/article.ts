export const useArticleStore = defineStore("article", () => {
  const data = reactive<any[]>([])
  const error = ref("")
  const isLoading = ref(false)

  const page = ref(1)
  const count = ref(10)
  const total = ref(0)

  const hasMore = ref(true)

  interface q {
    isRewrite?: boolean
    params?: { keyword?: string; category?: string }
  }

  async function fetch({ isRewrite, params }: q = {}) {
    isLoading.value = true

    const defaultParams = {
      limit: count.value,
      page: page.value - 1,
    }

    const reqParams = Object.assign(defaultParams, params ?? {})

    try {
      const res = await useApiFetch<any>("post/pagination", {
        query: reqParams,
      })

      if (!res && !res[0]) {
        error.value = "Error receiving articles. Try later"
        return
      }

      const postData = res[0]

      if (postData.total) {
        total.value = postData.total
      }

      if (!postData.hasMore) {
        hasMore.value = false
      }

      if (isRewrite) {
        data.length = 0
      }

      data.push(...postData.posts)

      return true
    } catch (e) {
      error.value = "Unexpected error. Try later"
      return false
    } finally {
      isLoading.value = false
    }
  }

  function reset() {
    data.length = 0
    page.value = 1
    total.value = 0
    hasMore.value = true
  }

  return { data, count, total, hasMore, page, error, isLoading, fetch, reset }
})
