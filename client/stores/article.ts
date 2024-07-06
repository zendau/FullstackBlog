import type { ArticleSchema } from "~/components/post/form/index.vue"

interface IQuoute {
  text: string
  author: string
}

export interface IFile {
  fileName: string
  size: number
  mimetype: string
  id: string
}

export type BlockContent = string | IQuoute | IFile

export interface IBlock {
  id?: string
  type: string
  content: BlockContent
}

interface IAuthor {
  email: string
  id: string
}

export interface IArticle {
  counterLikes: number
  counterDislikes: number
  counterComments: number
  counterReads: number
  file: IFile
  author: IAuthor
  id: string
  preview: string
  title: string
  tags: string[]
  timeRead: number
  createdDate: string
  rating: number
  blocks: IBlock[]
}

interface IFetchParam {
  keyword?: string
  category?: string
  authorId?: string
}

interface IFetch {
  isRewrite?: boolean
  params?: IFetchParam
}

interface IArticleFetch {
  list: IArticle[]
  total: number
  hasMore: boolean
}

interface IError {
  message: string
  isClear: boolean
}

type ArticleFormData = ArticleSchema & { id?: string; blocks: IBlock[] }

export const useArticleStore = defineStore("article", () => {
  const data = ref<IArticle[]>([])
  const error = reactive<IError>({
    isClear: true,
    message: "",
  })
  const isLoading = ref(false)

  const page = ref(1)
  const count = ref(10)
  const total = ref(0)

  const hasMore = ref(true)

  watch(
    () => error.message,
    () => {
      if (error.isClear) {
        setTimeout(() => {
          error.message = ""
          error.isClear = false
        }, 5000)
      } else {
        error.isClear = true
      }
    },
  )

  async function fetch({ isRewrite, params }: IFetch = {}) {
    isLoading.value = true

    if (isRewrite) {
      $reset()
    }

    try {
      const res = await useApiFetch<IArticleFetch>("post/pagination", {
        query: {
          limit: count.value,
          page: page.value - 1,
          ...params,
        },
      })

      if (!res) {
        error.message = "Error receiving articles. Try later"
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
      error.isClear = false
      error.message = "Unexpected error. Try later"
      return false
    } finally {
      isLoading.value = false
    }
  }

  function $reset() {
    data.value = []
    page.value = 1
    total.value = 0
    hasMore.value = true
  }

  async function add(articleData: ArticleFormData) {
    isLoading.value = true

    try {
      const formData = new FormData()

      for (const [key, value] of Object.entries<any>(articleData)) {
        formData.append(key, value)
      }

      const articleRes = await useApiFetch<IArticle>("post/create", {
        method: "post",
        body: formData,
      })

      if (!articleRes) {
        throw new Error(
          "Error occurred when creating the article. Repeat later",
        )
      }

      data.value.push(articleRes)

      return articleRes.id
    } catch (e: any) {
      error.message = e.message ?? "Unexpected error. Repeat later"
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function edit(articleData: ArticleFormData) {
    isLoading.value = true

    try {
      const formData = new FormData()

      for (const [key, value] of Object.entries<any>(articleData)) {
        formData.set(key, value)
      }

      const productRes = await useApiFetch<IArticle>("post/edit", {
        method: "patch",
        body: formData,
      })

      if (!productRes) {
        throw new Error("Error when changing the article. Repeat later")
      }

      return productRes.id
    } catch (e: any) {
      error.message = e.message ?? "Unexpected error. Repeat later"
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function remove(articleId: string) {
    isLoading.value = true

    try {
      const productRes = await useApiFetch<boolean>(
        `post/delete/${articleId}`,
        {
          method: "delete",
        },
      )

      if (!productRes) {
        throw new Error(
          "Error occurred when deleting the article. Repeat later",
        )
      }

      return true
    } catch (e: any) {
      error.message = e.message ?? "Unexpected error. Repeat later"
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    data,
    page,
    count,
    error,
    total,
    hasMore,
    isLoading,
    add,
    edit,
    fetch,
    remove,
    $reset,
  }
})
