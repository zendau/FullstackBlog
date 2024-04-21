<script setup lang="ts">
const articleStore = useArticleStore()
const articleParams = useArticleParamsStore()
const router = useRouter()
const route = useRoute()

const currentPage = parseInt(route.query.page as any)

if (currentPage && currentPage > 1) articleStore.page = currentPage

const { y } = useWindowScroll({ behavior: "smooth" })

watch(
  () => articleStore.page,
  (page) => {
    router.push({ query: { ...route.query, page } })
    articleStore.fetch({ isRewrite: true })
    y.value = 0
  },
)

await useAsyncData("posts", async () => await articleParams.fetchFilterData(), {
  server: true,
})
</script>

<template>
  <PostSkeletonList v-if="articleStore.isLoading" />
  <PostList v-else />

  <div class="flex justify-center m-10">
    <UPagination
      v-if="!articleParams.isFilter"
      v-model="articleStore.page"
      :page-count="10"
      :total="articleStore.total"
      show-last
      show-first
    />
  </div>
</template>

<style lang="scss" scoped></style>
