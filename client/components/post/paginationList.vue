<script setup lang="ts">
const articleStore = useArticleStore()
const router = useRouter()
const route = useRoute()

const currentPage = parseInt(route.query.page as any)

if (currentPage && currentPage > 1) articleStore.page = currentPage

const { y } = useWindowScroll({ behavior: "smooth" })

watch(
  () => articleStore.page,
  (page) => {
    router.push({ query: { page } })
    articleStore.fetch(true)
    y.value = 0
  },
)

const { pending } = useAsyncData("posts", () => articleStore.fetch(true), {
  server: true,
})
</script>

<template>
  <PostSkeletonList v-if="pending || articleStore.isLoading" />
  <PostList v-else />

  <div class="flex justify-center m-10">
    <UPagination
      v-model="articleStore.page"
      :page-count="10"
      :total="articleStore.total"
      show-last
      show-first
    />
  </div>
</template>

<style lang="scss" scoped></style>
