<script setup lang="ts">
const { content } = defineProps<{
  content?: IFile[]
}>()

const filesList = getInitData()

function getInitData(): string[] {
  if (!content || !Array.isArray(content)) return []

  return content.map((file) => getApiFile(file.fileName))
}
</script>

<template>
  <UCarousel
    v-if="filesList.length > 0"
    v-slot="{ item }"
    :items="filesList"
    :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3' }"
    arrows
    indicators
  >
    <img :src="item" width="300" height="400" draggable="false" />
  </UCarousel>
</template>

<style lang="scss" scoped></style>
