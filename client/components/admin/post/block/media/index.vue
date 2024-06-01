<script setup lang="ts">
import type { IFile } from "./upload.vue"

defineExpose({
  getData,
})

const media = reactive<IFile[]>([])
provide("media", media)

function getData() {
  if (!media.length) return

  const idList = media.map((file) => file.id)

  return {
    block: "media",
    content: idList,
  }
}
</script>

<template>
  <AdminPostBlockMediaUpload />
  <AdminPostBlockMediaList />
</template>

<style lang="scss" scoped></style>
