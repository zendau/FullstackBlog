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

interface ICreateComment {
  postId: string
  message: string
}
interface IEditComment {
  commentId: string

  message: string
}

export const useCommentStore = defineStore("comment", () => {
  const data = reactive<IComment[]>([])
  const error = ref("")
  const isLoading = ref(false)

  const page = ref(1)
  const count = ref(5)
  const total = ref(0)

  const postId = ref("")
  const authorId = ref("")

  const hasMore = ref(true)

  watch(error, () => {
    setTimeout(() => (error.value = ""), 5000)
  })

  function $reset() {
    page.value = 1
    isLoading.value = false
    error.value = ""
    data.length = 0
    hasMore.value = true
    total.value = 0

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

  async function add(comment: ICreateComment) {
    try {
      const commentData = await useApiFetch<IComment>("comment/add", {
        method: "post",
        body: {
          ...comment,
        },
      })

      data.unshift(commentData)
      total.value++

      return true
    } catch (e) {
      error.value = "Error when sending a comment"
      return false
    }
  }

  async function edit(comment: IEditComment, index: number) {
    try {
      const commentData = await useApiFetch<IComment>("comment/edit", {
        method: "put",
        body: {
          ...comment,
        },
      })

      if (!commentData || !data[index]) throw Error

      const currentComment = data[index]

      currentComment.edited = true
      currentComment.message = comment.message

      return true
    } catch (e) {
      error.value = "Error when editing a comment"
      return false
    }
  }

  async function remove(commentId: string, index: number) {
    try {
      const commentData = await useApiFetch<IComment>("comment/delete", {
        method: "delete",
        body: {
          commentId,
        },
      })

      if (!commentData || !data[index]) throw Error

      data.splice(index, 1)
      total.value--

      return true
    } catch (e) {
      error.value = "Error when deleting a comment"
      return false
    }
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
    edit,
    fetch,
    $reset,
    remove,
  }
})
