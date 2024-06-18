<script setup lang="ts">
import {
  PostBlockHeader,
  PostBlockCode,
  PostBlockText,
  PostBlockSpace,
  PostBlockList,
  PostBlockQuoute,
  PostBlockFile,
  PostBlockSlider,
} from "#components"

const { blocks } = defineProps<{
  blocks: IBlock[]
}>()

function getComponent(type: string) {
  if (type === "header") {
    return PostBlockHeader
  } else if (type === "text") {
    return PostBlockText
  } else if (type === "space") {
    return PostBlockSpace
  } else if (type === "code") {
    return PostBlockCode
  } else if (type === "list") {
    return PostBlockList
  } else if (type === "file") {
    return PostBlockFile
  } else if (type === "slider") {
    return PostBlockSlider
  } else if (type === "quoute") {
    return PostBlockQuoute
  }

  return null
}
</script>

<template>
  <template v-for="block in blocks" :key="block.id">
    <component :is="getComponent(block.type)" :content="block.content" />
  </template>
</template>

<style lang="scss" scoped></style>
