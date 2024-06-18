<script setup lang="ts">
const { content } = defineProps<{
  content?: IFile[]
}>()

const url = import.meta.env.VITE_API
</script>

<template>
  <img
    v-if="content && Array.isArray(content)"
    :src="`${url}/image/${content[0].fileName}`"
  />
</template>

<style lang="scss" scoped></style>
