<script setup lang="ts">
const { image } = defineProps<{
  image: string | undefined
}>()

const files = inject("files", [])
</script>

<template>
  <UiFileUpload v-model="files" accept=".jpeg, .jpg, .png, .gif, .svg" />

  <template v-if="files.length > 0">
    <img v-for="file in files" :key="file" :src="getMediaSrc(file)" alt="" />
  </template>
  <img v-else-if="image" :src="getApiFile(image)" alt="" />
</template>

<style lang="scss" scoped>
img {
  margin-top: 10px;
}
</style>
