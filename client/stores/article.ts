export const useArticleStore = defineStore("article", () => {
  const data = reactive<any[]>([])
  const error = ref("")
  const isLoading = ref(false)

  const page = ref(1)
  const count = ref(10)
  const total = ref(0)

  const hasMore = ref(true)

  async function fetch(isRewrite = false) {
    isLoading.value = true

    try {
      const res = await useApiFetch<{
        data: any
        next_page_url: string
        total: number
      }>("https://api.fakestorejson.com/api/v1/public/products", {
        query: {
          per_page: count.value,
          page: page.value,
        },
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

  return { data, count, total, hasMore, page, error, isLoading, fetch }
})
