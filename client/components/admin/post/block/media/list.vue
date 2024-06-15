<script setup lang="ts">
import type { MediaMap } from "./index.vue"

const media = inject<MediaMap>("media", new Map())

function removeUploadImg(key: string) {
  const removeFile = media.get(key)
  if (!removeFile) return

  if ("id" in removeFile) {
    useApiFetch(`/file/delete/${removeFile.id}`, {
      method: "delete",
    })
  }

  media.delete(key)
}
</script>

<template>
  <div class="file-container">
    <AdminPostBlockMediaItem
      v-for="[key, file] in media"
      :key="key"
      :file="file"
      :index="key"
      @remove-img="removeUploadImg"
    />
  </div>
</template>

<style lang="scss" scoped>
.file-container {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  align-content: center;
}
</style>
