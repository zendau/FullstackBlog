<script setup lang="ts">
import { PostLayoutGrid, PostLayoutSingl } from "#components"

const { data: articles } = storeToRefs(useArticleStore())
const setting = useArticleSettingStore()

const postLayout = computed(() => {
  if (setting.currentView === "grid") {
    return PostLayoutGrid
  }

  return PostLayoutSingl
})
</script>

<template>
  <component :is="postLayout">
    <PostCard
      v-for="post of articles"
      :key="post.id"
      :post="post"
      is-extended
    />
  </component>
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
