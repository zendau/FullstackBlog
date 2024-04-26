<script setup lang="ts">
const files = reactive([])
provide("files", files)
</script>

<template>
  <UiFileUpload />
  <AdminPostBlockMediaList />
</template>

<style lang="scss" scoped></style>
