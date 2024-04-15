<script setup lang="ts">
import { vIntersectionObserver } from "@vueuse/components"

const articleStore = useArticleStore()
const isVisible = ref(false)

articleStore.fetch()

async function onIntersectionObserver([
  { isIntersecting },
]: IntersectionObserverEntry[]) {
  if (articleStore.isLoading || !articleStore.hasMore || !isIntersecting) return
  isVisible.value = isIntersecting

  console.log("fetch in observer")
  articleStore.page++
  await articleStore.fetch()
  isVisible.value = false
}
</script>

<template>
  <PostSkeletonList v-if="articleStore.isLoading" />
  <PostList v-else />

  <div v-if="isVisible">loading...</div>
  <div
    v-else-if="!articleStore.isLoading"
    v-intersection-observer="onIntersectionObserver"
    class="observer"
  ></div>
</template>

<style lang="scss" scoped>
.observer {
  display: block;
  height: 1px;
}
</style>
