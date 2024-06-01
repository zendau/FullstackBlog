<script setup lang="ts">
import type { IFile } from "./upload.vue"

const { file } = defineProps<{
  file: IFile
}>()

const emit = defineEmits<{
  removeImg: []
}>()

const imgTypes = ["image/png", "image/jpg", "image/jpeg"]
const videoTypes = ["video/mp4"]

function mediaFiler(type: string) {
  if (imgTypes.includes(type)) return "img"
  else if (videoTypes.includes(type)) return "video"
  return null
}

const type = mediaFiler(file.mimetype)

const url = import.meta.env.VITE_API
</script>

<template>
  <div class="img__container">
    <img v-if="type === 'img'" :src="`${url}/image/${file.fileName}`" />
    <video v-else-if="type === 'video'" controls>
      <source :src="`${url}/image/${file.fileName}`" />
    </video>
    <p v-else>Unsupported media file format</p>
    <p>{{ file.fileName }}</p>
    <button @click="emit('removeImg')">✕</button>
  </div>
</template>

<style lang="scss" scoped>
.img {
  &__container {
    position: relative;
    width: 500px;
    height: auto;
    margin: 15px 0;

    p {
      text-align: center;
    }

    button {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 30px;
      color: white;
    }
  }
}
</style>
