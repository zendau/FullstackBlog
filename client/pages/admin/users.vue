<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "protect-by-auth",
})

useHead({
  title: "Site users",
})
</script>

<template>
  <h1>Users list</h1>
</template>

<style scoped lang="scss"></style>
