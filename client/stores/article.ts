export const useArticleStore = defineStore("article", () => {
  const data = reactive<any[]>([])
  const error = ref("")
  const isLoading = ref(false)

  const page = ref(1)
  const count = ref(10)
  const total = ref(0)

  const hasMore = ref(true)

  interface IFetchParam {
    keyword?: string
    category?: string
    authorId?: string
  }

  interface IFetch {
    isRewrite?: boolean
    params?: IFetchParam
  }

  async function fetch({ isRewrite, params }: IFetch = {}) {
    isLoading.value = true

    if (isRewrite) {
      $reset()
    }

    try {
      const res = await useApiFetch<any>("post/pagination", {
        query: {
          limit: count.value,
          page: page.value - 1,
          ...params,
        },
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

      data.push(...postData.posts)

      return true
    } catch (e) {
      error.value = "Unexpected error. Try later"
      return false
    } finally {
      isLoading.value = false
    }
  }

  function $reset() {
    data.length = 0
    page.value = 1
    total.value = 0
    hasMore.value = true
  }

  return { data, count, total, hasMore, page, error, isLoading, fetch, $reset }
})
