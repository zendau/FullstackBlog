<script setup lang="ts">
import { PostPaginationList, PostInfinityList } from "#components"

const setting = useArticleSettingStore()

const articleParams = useArticleParamsStore()
articleParams.reset()

const postListType = computed(() => {
  if (setting.currentList === "pagination") {
    return PostPaginationList
  }

  return PostInfinityList
})
</script>

<template>
  <component :is="postListType" />
</template>

<style lang="scss" scoped></style>
