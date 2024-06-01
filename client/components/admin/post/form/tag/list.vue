<script setup lang="ts">
const tags = inject("tags", [])

function removeItem(index: number) {
  tags.splice(index, 1)
}
</script>

<template>
  <AdminPostFormTagItem
    v-for="(tag, index) in tags"
    :key="index"
    :tag="tag"
    @remove-item="removeItem(index)"
  />
</template>

<style lang="scss" scoped></style>
