<script setup lang="ts">
import { PostLayoutGrid, PostLayoutSingl } from "#components"

const { data: articles } = storeToRefs(useArticleStore())
const setting = useArticleSettingStore()
const articleStore = useArticleStore()
const articleParams = useArticleParamsStore()
const route = useRoute()
const postId = route.params.id

const postLayout = computed(() => {
  if (setting.currentView === "grid") {
    return PostLayoutGrid
  }

  return PostLayoutSingl
})

onUnmounted(() => {
  articleParams.reset()
})
</script>

<template>
  <component :is="postLayout">
    <template v-for="post of articles" :key="post.id">
      <PostCard v-if="postId !== post.id" :post="post" />
    </template>
  </component>
  <PostEmpty v-if="!articleStore.isLoading && !articleStore.data.length" />
  <PostSkeletonList v-if="articleStore.isLoading" />
</template>
