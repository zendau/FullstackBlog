<script setup lang="ts">
const { tag } = defineProps<{
  tag: string
}>()

const emit = defineEmits<{
  removeItem: []
}>()
</script>

<template>
  <div>{{ tag }}</div>
  <button @click="emit('removeItem')">X</button>
</template>

<style lang="scss" scoped></style>
