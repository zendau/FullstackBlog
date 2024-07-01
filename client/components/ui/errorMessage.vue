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
    title="Error"
    :description="message"
    class="mb-3"
  />
</template>

<style lang="scss" scoped></style>
