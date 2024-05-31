<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "protect-by-auth",
})
</script>

<template>
  <h1>Create post</h1>
  <AdminPostForm />
  <AdminPostConstructor />
</template>

<style scoped lang="scss"></style>
