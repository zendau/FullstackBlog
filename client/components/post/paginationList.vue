<script setup lang="ts">
const articleStore = useArticleStore()
// const router = useRouter()

// const { x, y } = useWindowScroll({ behavior: "smooth" })

// watch(page, () => {
//   router.push({ query: { page: articleStore.page } })
//   x.value = 0
//   y.value = 0
// })
</script>

<template>
  <PostSkeletonList v-if="articleStore.isLoading" />
  <PostList v-else />

  <div class="flex justify-center m-10">
    <UPagination
      v-model="articleStore.page"
      :page-count="10"
      :total="50"
      show-last
      show-first
    />
  </div>
</template>

<style lang="scss" scoped></style>
