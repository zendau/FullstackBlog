export const useCommentStore = defineStore("comment", () => {
  const page = ref(1)
  const isLoading = ref(false)
  const error = ref("")
  const data = reactive<any[]>([])
  const hasMore = ref(true)
  const total = ref()

  function reset() {
    page.value = 1
    isLoading.value = false
    error.value = ""
    data.length = 0
    hasMore.value = true
    total.value = undefined
  }

  async function fetch() {
    isLoading.value = true

    try {
      const res = await useApiFetch<{
        next_page_url: string
        data: any[]
        total: number
      }>("https://api.fakestorejson.com/api/v1/public/posts", {
        query: {
          per_page: 10,
          page: page.value,
        },
      })

      if (!res.next_page_url) hasMore.value = false
      if (res.total) total.value = res.total

      page.value++
      data.push(...res.data)
      return true
    } catch (e) {
      error.value = ""
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    page,
    isLoading,
    error,
    data,
    hasMore,
    total,
    fetch,
    reset,
  }
})
