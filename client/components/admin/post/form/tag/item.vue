<script setup lang="ts">
const { tag } = defineProps<{
  tag: string
}>()

const emit = defineEmits<{
  removeItem: []
}>()
</script>

<template>
  <div>
    <p>{{ tag }}</p>
    <button @click="emit('removeItem')">X</button>
  </div>
</template>

<style lang="scss" scoped>
div {
  position: relative;
  margin-bottom: 10px;
  margin-left: 30px;
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -30px;
  font-size: 22px;
}
</style>
