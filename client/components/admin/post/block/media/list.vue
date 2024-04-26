<script setup lang="ts">
const files = inject<File[]>("files", [])

function removeUploadImg(index: number) {
  files.splice(index, 1)
}
</script>

<template>
  <AdminPostBlockMediaItem
    v-for="(file, index) in files"
    :key="file.name"
    :file="file"
    @remove-img="removeUploadImg(index)"
  />
</template>

<style lang="scss" scoped></style>
