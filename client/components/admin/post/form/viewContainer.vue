<script setup lang="ts">
const { error } = defineProps<{
  error?: Error | null
}>()
</script>

<template>
  <div class="view-container">
    <h1><slot name="header" /></h1>
    <UAlert
      v-if="error"
      icon="i-heroicons-command-line"
      title="Error"
      color="red"
      description="Article not found"
      class="my-3"
    />
    <slot v-else name="body" />
  </div>
</template>

<style scoped lang="scss">
.view-container {
  position: relative;
  margin: 15px 0;
  background-color: #fff;
  padding: 20px;
}

h1 {
  font-size: 22px;
  font-weight: 500;
  text-align: center;
}
</style>
