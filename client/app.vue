<script setup lang="ts">
const layout = "admin"
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
body {
  background-color: #fff;
  color: black;
}
</style>
