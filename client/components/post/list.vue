<script setup lang="ts">
import { PostLayoutGrid, PostLayoutSingl } from "#components"

const { data: articles } = storeToRefs(useArticleStore())
const setting = useArticleSettingStore()
const articleStore = useArticleStore()
const articleParams = useArticleParamsStore()
const postId = inject("articleId")

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
      <PostCard v-if="postId !== post.id" :post="post" is-extended />
    </template>
  </component>
  <PostEmpty v-if="!articleStore.isLoading && !articleStore.data.length" />
  <PostSkeletonList v-if="articleStore.isLoading" />
</template>

<style lang="scss">
.cart {
  background-color: red;
  &__container {
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 15px;
  }
}
</style>
