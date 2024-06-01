<script setup lang="ts">
import type { IFile } from "./upload.vue"

const media = inject<IFile[]>("media", [])

function removeUploadImg(index: number) {
  const removeFile = media[index]

  useApiFetch(`/file/delete/${removeFile.id}`, {
    method: "delete",
  })

  media.splice(index, 1)
}
</script>

<template>
  <AdminPostBlockMediaItem
    v-for="(file, index) in media"
    :key="file.id"
    :file="file"
    @remove-img="removeUploadImg(index)"
  />
</template>

<style lang="scss" scoped></style>
