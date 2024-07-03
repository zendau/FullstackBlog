<script setup lang="ts">
import { vIntersectionObserver } from "@vueuse/components"

const articleStore = useArticleStore()
const articleParams = useArticleParamsStore()
const isVisible = ref(false)

const { pending } = await useLazyAsyncData("posts", () =>
  articleParams.fetchFilterData(true),
)

async function onIntersectionObserver([
  { isIntersecting },
]: IntersectionObserverEntry[]) {
  if (
    pending.value ||
    articleStore.isLoading ||
    isVisible.value ||
    !articleStore.hasMore ||
    !isIntersecting
  )
    return
  isVisible.value = true

  articleStore.page++
  await articleParams.fetchFilterData(false)
  isVisible.value = false
}
</script>

<template>
  <PostList />
  <UiUpBtn />
  <PostSkeletonList v-if="isVisible" />
  <div v-intersection-observer="onIntersectionObserver" class="observer"></div>
</template>

<style lang="scss" scoped>
.observer {
  height: 1px;
  display: block;
}
</style>
