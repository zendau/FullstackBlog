<script setup lang="ts">
const { message } = defineProps({
  message: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <UAlert
    v-if="message"
    icon="i-heroicons-command-line"
    color="red"
    variant="solid"
    title="Errpr"
    :description="message"
  />
  <p class="text-red-600"></p>
</template>

<style lang="scss" scoped></style>
