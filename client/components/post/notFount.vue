<script setup lang="ts">
const { id } = defineProps({
  id: {
    type: [String],
    required: true,
  },
})
</script>

<template>
  <h1>
    Post with id <span>{{ id }}</span> not found
  </h1>
</template>

<style lang="scss" scoped></style>
