<script setup lang="ts">
const { src, type } = defineProps<{
  src: string
  type: string
}>()

const imgTypes = ["image/png", "image/jpg", "image/jpeg"]
const videoTypes = ["video/mp4"]

function mediaFiler() {
  if (imgTypes.includes(type)) return "img"
  else if (videoTypes.includes(type)) return "video"
  return null
}
</script>

<template>
  <img v-if="mediaFiler() === 'img'" :src="src" />
  <video v-else-if="mediaFiler() === 'video'" controls>
    <source :src="src" />
  </video>
  <p v-else>Unsupported media file format</p>
</template>

<style lang="scss" scoped></style>
