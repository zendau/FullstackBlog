interface IPost {
  id: string
  title: string
}

interface IUser {
  email: string
  id: string
  roles: string[]
  isActivated: boolean
  isBlocked: boolean
}

interface IComment {
  createdDate: string
  edited: boolean
  id: string
  message: string
  post: IPost
  user: IUser
}

export const useCommentStore = defineStore("comment", () => {
  const data = reactive<IComment[]>([])
  const error = ref("")
  const isLoading = ref(false)

  const page = ref(1)
  const count = ref(5)
  const total = ref()

  const postId = ref("")
  const authorId = ref("")

  const hasMore = ref(true)
  function $reset() {
    page.value = 1
    isLoading.value = false
    error.value = ""
    data.length = 0
    hasMore.value = true
    total.value = undefined

    postId.value = ""
    authorId.value = ""
  }

  function prepareFilterQuery() {
    const filter: {
      postId?: string
      authorId?: string
    } = {}

    if (postId.value) {
      filter.postId = postId.value
    }

    if (authorId.value) {
      filter.authorId = authorId.value
    }

    return filter
  }

  async function fetch() {
    isLoading.value = true

    try {
      const res = await useApiFetch<
        {
          hasMore: boolean
          list: IComment[]
          total: number
        }[]
      >("comment/list", {
        query: {
          limit: count.value,
          page: page.value - 1,
          ...prepareFilterQuery(),
        },
      })

      if (!res && !res[0]) {
        error.value = "Error receiving comment. Try later"
        return
      }

      const commentsData = res[0]

      if (!commentsData.hasMore) hasMore.value = false
      if (commentsData.total) total.value = commentsData.total

      page.value++
      data.push(...commentsData.list)
      return true
    } catch (e) {
      error.value = ""
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function send(comment: any) {
    isLoading.value = true

    try {
      const commentData = await useApiFetch<IComment>("comment/add", {
        method: "post",
        body: {
          ...comment,
        },
      })

      data.unshift(commentData)

      return true
    } catch (e) {
      error.value = ""
      return false
    } finally {
      isLoading.value = false
    }
  }

  function add(comment: any) {
    send(comment)
    total.value++
  }

  return {
    page,
    data,
    error,
    total,
    postId,
    hasMore,
    authorId,
    isLoading,
    add,
    fetch,
    $reset,
  }
})
