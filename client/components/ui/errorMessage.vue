<script setup lang="ts">
const { message, classData } = defineProps<{
  message: string
  classData?: string
}>()
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
    :class="classData"
  />
</template>

<style lang="scss" scoped></style>
