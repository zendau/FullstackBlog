<script setup lang="ts">
const { image } = defineProps<{
  image: string | undefined
}>()

const url = import.meta.env.VITE_API

const files = inject("files", [])
</script>

<template>
  <UiFileUpload v-model="files" accept=".jpeg, .jpg, .png, .gif, .svg" />

  <template v-if="files.length > 0">
    <img v-for="file in files" :key="file" :src="getMediaSrc(file)" alt="" />
  </template>
  <img v-else-if="image" :src="`${url}/image/${image}`" alt="" />
</template>

<style lang="scss" scoped></style>
