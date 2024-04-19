<script setup lang="ts">
import { vIntersectionObserver } from "@vueuse/components"

const articleStore = useArticleStore()
const articleParams = useArticleParamsStore()
const isVisible = ref(false)

const { pending } = useAsyncData(
  "posts",
  () => articleParams.fetchFilterData(),
  {
    server: true,
  },
)

async function onIntersectionObserver([
  { isIntersecting },
]: IntersectionObserverEntry[]) {
  if (isVisible.value || !articleStore.hasMore || !isIntersecting) return
  isVisible.value = true

  articleStore.page++
  await articleStore.fetch()
  isVisible.value = false
}
</script>

<template>
  <PostSkeletonList v-if="pending" />
  <PostList v-else />

  <UiUpBtn />
  <UiLoader v-if="isVisible" />
  <div v-intersection-observer="onIntersectionObserver" class="observer"></div>
</template>

<style lang="scss" scoped>
.observer {
  height: 1px;
  display: block;
}
</style>
