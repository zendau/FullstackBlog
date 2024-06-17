import type { ArticleSchema } from "~/components/admin/post/form/index.vue"

export interface IBlock {
  type: string
  content: string
}

export interface IFile {
  fileName: string
  size: number
  mimetype: string
  id: string
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
  posts: IArticle[]
  total: number
  hasMore: boolean
}

type ArticleFormData = ArticleSchema & { id?: string; blocks: IBlock[] }

export const useArticleStore = defineStore("article", () => {
  const data = reactive<IArticle[]>([])
  const error = ref("")
  const isLoading = ref(false)

  const page = ref(1)
  const count = ref(10)
  const total = ref(0)

  const hasMore = ref(true)

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
        error.value = "Error receiving articles. Try later"
        return
      }

      if (res.total) {
        total.value = res.total
      }

      if (!res.hasMore) {
        hasMore.value = false
      }

      data.push(...res.posts)

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

      data.push(articleRes)

      return articleRes.id
    } catch (e: any) {
      error.value = e.message ?? "Unexpected error. Repeat later"
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
    fetch,
    $reset,
  }
})
