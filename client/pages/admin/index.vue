<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "protect-by-auth",
})

useHead({
  title: "Admin panel",
})
</script>

<template>
  <div>Select operation</div>
</template>

<style scoped>
div {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
</style>
