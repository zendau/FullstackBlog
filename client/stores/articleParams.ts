import type { LocationQueryValue } from "vue-router"

type filter = "search" | "category" | "sort"
type routeFilter = LocationQueryValue | undefined

export const useArticleParamsStore = defineStore("articleParams", () => {
  const route = useRoute()
  const router = useRouter()
  const articleStore = useArticleStore()

  const defaultSort = "byRating"

  const authorId = ref("")
  const search = ref<routeFilter>(route.query.search as LocationQueryValue)
  const category = ref<routeFilter>(route.query.category as LocationQueryValue)
  const tag = ref<routeFilter>(route.query.tag as LocationQueryValue)
  const sort = ref<routeFilter>(
    (route.query.sort as LocationQueryValue) || defaultSort,
  )

  const isFilter = computed(
    () => Boolean(search.value) || Boolean(category.value),
  )

  function addTag(value: string) {
    tag.value = value
    router.push({ query: { tag: value } })
    fetchFilterData(true)
  }

  function addQuery(field: filter) {
    let value = null
    switch (field) {
      case "search":
        value = search.value
        break
      case "category":
        value = category.value
        break
      case "sort":
        value = sort.value
        break
      default:
        break
    }
    fetchFilterData(true)
    router.push({ query: { ...route.query, [field]: value } })
  }

  function removeQuery(field: filter) {
    const query = { ...route.query }
    delete query[field]
    fetchFilterData(true)
    router.push({ query })
  }

  function reset() {
    search.value = undefined
    category.value = undefined
    tag.value = undefined
    sort.value = defaultSort
    authorId.value = ""
  }

  function defaultFilter() {
    reset()
    fetchFilterData(true)
    router.push(route.path)
  }

  function prepareFilterQuery() {
    const filter: {
      substring?: string
      category?: string
      tag?: string
      sort?: string
      authorId?: string
    } = {}

    if (search.value) {
      filter.substring = search.value as string
    }

    if (category.value) {
      filter.category = category.value as string
    }

    if (tag.value) {
      filter.tag = tag.value as string
    }

    if (sort.value) {
      filter.sort = sort.value as string
    }

    if (authorId.value) {
      filter.authorId = authorId.value
    }

    return filter
  }

  function fetchFilterData(isRewrite: boolean) {
    const params = prepareFilterQuery()
    return articleStore.fetch({ isRewrite, params })
  }

  return {
    tag,
    sort,
    search,
    category,
    authorId,
    isFilter,
    addTag,
    addQuery,
    removeQuery,
    reset,
    defaultFilter,
    prepareFilterQuery,
    fetchFilterData,
  }
})
