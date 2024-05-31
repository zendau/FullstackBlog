<script setup lang="ts">
const { tag, index } = defineProps<{
  tag: string
  index: number
}>()

const tags = inject("tags", [])

function removeItem() {
  console.log("t", tags, index)
  tags.splice(index, 1)
}
</script>

<template>
  <div>{{ tag }}</div>
  <button @click="removeItem">X</button>
</template>

<style lang="scss" scoped></style>
