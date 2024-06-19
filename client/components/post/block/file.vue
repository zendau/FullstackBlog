<script setup lang="ts">
const { content } = defineProps<{
  content?: IFile[]
}>()
</script>

<template>
  <img
    v-if="content && Array.isArray(content)"
    :src="getApiFile(content[0].fileName)"
  />
</template>

<style lang="scss" scoped></style>
