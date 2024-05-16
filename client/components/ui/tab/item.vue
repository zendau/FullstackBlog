<script setup lang="ts">
const { title } = defineProps<{
  title: string
}>()

const activeTab = inject("activeTab", "")
</script>

<template>
  <div v-if="title === activeTab">
    <slot />
  </div>
</template>

<style lang="scss" scoped></style>
