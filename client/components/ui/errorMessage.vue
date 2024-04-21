<script setup lang="ts">
const { message } = defineProps({
  message: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <p class="text-red-600">{{ message }}</p>
</template>

<style lang="scss" scoped></style>
