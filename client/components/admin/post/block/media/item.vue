<script setup lang="ts">
import type { PropType } from "vue"

const { file } = defineProps({
  file: {
    type: Object as PropType<File>,
    required: true,
  },
})

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

const type = mediaFiler(file.type)
</script>

<template>
  <div class="img__container">
    <img v-if="type === 'img'" :src="getMediaSrc(file)" />
    <video v-else-if="type === 'video'" controls>
      <source :src="getMediaSrc(file)" />
    </video>
    <p v-else>Unsupported media file format</p>
    <p>{{ file.name }}</p>
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
