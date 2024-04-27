<script setup lang="ts">
defineExpose({
  getData,
})

const files = reactive([])
provide("files", files)

function getData() {
  if (!files.length) return

  return {
    block: "slider",
    content: files,
  }
}

function getFilesListSrc() {
  return files.map((file) => getMediaSrc(file))
}
</script>

<template>
  <UiFileUpload />
  <UCarousel
    v-if="files.length > 0"
    v-slot="{ item }"
    :items="getFilesListSrc()"
    :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3' }"
    arrows
    indicators
  >
    <img :src="item" width="300" height="400" draggable="false" />
  </UCarousel>
</template>

<style lang="scss" scoped></style>
