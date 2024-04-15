<script setup lang="ts">
// const router = useRouter()
// const route = useRoute()

// const currentPage = parseInt(route.query.page as any)

// if (currentPage && currentPage > 1) page.value = currentPage

// const POST_ON_PAGE = 10

// const articleStore = useArticleStore()
// articleStore.fetch()
// const { data: posts, pending } = useFetch(
//   "https://api.fakestorejson.com/api/v1/public/products",
//   {
//     query: {
//       per_page: POST_ON_PAGE,
//       page,
//     },
//     transform: (posts: any) => {
//       return posts.data.map((post: any) => ({
//         id: post.id,
//         name: post.name,
//         desc: post.description,
//       }))
//     },
//     lazy: true,
//     key: `post-page/${page.value}`,
//   },
// )

// const pending = ref(true)

// const res: { data: any[] } = await useApiFetch(
//   "https://api.fakestorejson.com/api/v1/public/products",
//   {
//     query: {
//       per_page: POST_ON_PAGE,
//       page,
//     },
//   },
// )

// console.log("res", res.data)

// posts.push(...res.data)
// pending.value = false
// const postMaxitemsCount = 55

// watch(page, () => {
//   router.push({ query: { page: page.value } })
//   // x.value = 0
//   // y.value = 0
// })
</script>

<template>
  <h1 class="text-center text-4xl m-4">Catalog</h1>
  <PostFilter />
  <PostInfinityList />
</template>

<style lang="scss"></style>
