<script setup lang="ts">
const tags = inject("tags", [])
</script>

<template>
  <AdminPostFormTagItem
    v-for="(tag, index) in tags"
    :key="index"
    :tag="tag"
    :index="index"
  />
</template>

<style lang="scss" scoped></style>
