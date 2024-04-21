<script setup lang="ts">
import { PostPaginationList, PostInfinityList } from "#components"

const articleStore = useArticleStore()

const setting = useArticleSettingStore()

const postListType = computed(() => {
  if (setting.currentList === "pagination") {
    return PostPaginationList
  }

  return PostInfinityList
})
</script>

<template>
  <component :is="postListType" />
  <PostEmpty v-if="!articleStore.isLoading && !articleStore.data.length" />
</template>

<style lang="scss" scoped></style>
