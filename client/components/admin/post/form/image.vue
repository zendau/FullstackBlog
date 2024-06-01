<script setup lang="ts">
const files = inject("files", [])
</script>

<template>
  <UiFileUpload v-model="files" accept=".jpeg, .jpg, .png, .gif, .svg" />

  <template v-if="files.length > 0">
    <img :src="getMediaSrc(files[0])" alt="" />
  </template>
</template>

<style lang="scss" scoped></style>
