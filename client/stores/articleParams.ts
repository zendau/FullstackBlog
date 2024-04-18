type filter = "search" | "category"

export const useArticleParamsStore = defineStore("articleParams", () => {
  const route = useRoute()
  const router = useRouter()
  const articleStore = useArticleStore()

  const search = ref(route.query.search)
  const category = ref(route.query.category)

  const isFilter = computed(
    () => Boolean(search.value) || Boolean(category.value),
  )

  function addQuery(field: filter) {
    let value = null

    switch (field) {
      case "search":
        value = search.value
        break
      case "category":
        value = category.value
        break
      default:
        break
    }
    fetchFilterData()
    router.push({ query: { ...route.query, [field]: value } })
  }

  function removeQuery(field: filter) {
    const query = { ...route.query }
    delete query[field]
    router.push({ query })
  }

  function reset() {
    search.value = ""
    category.value = ""

    const page = route.query?.page

    router.push({ query: { page } })
  }

  function prepareFilterQuery() {
    const filter: { keyword?: string; category?: string } = {}

    if (search.value) {
      filter.keyword = search.value as string
    }

    if (category.value) {
      filter.category = category.value as string
    }

    return filter
  }

  function fetchFilterData() {
    articleStore.page = 1
    const params = prepareFilterQuery()
    return articleStore.fetch({ isRewrite: true, params })
  }

  return {
    search,
    category,
    isFilter,
    addQuery,
    removeQuery,
    reset,
    prepareFilterQuery,
    fetchFilterData,
  }
})
