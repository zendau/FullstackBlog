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
  <PostEmpty v-if="!articleStore.isLoading && !articleStore.data.length" />
  <component :is="postListType" />
</template>

<style lang="scss" scoped></style>
