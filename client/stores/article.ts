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
      per_page: count.value,
      page: page.value,
    }

    try {
      const res = await useApiFetch<{
        data: any
        next_page_url: string
        total: number
      }>("https://api.fakestorejson.com/api/v1/public/products", {
        query: params ?? defaultParams,
      })

      if (!res || !res.data) {
        error.value = "Error receiving articles. Try later"
        return
      }

      if (res.total) {
        total.value = res.total
      }

      if (!res.next_page_url) {
        hasMore.value = false
      }

      if (isRewrite) {
        data.length = 0
      }

      data.push(...res.data)

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
