<script setup lang="ts">
definePageMeta({
  middleware: "public",
})

useHead({
  title: "Login",
})
</script>
<template>
  <UiViewFormLayout>
    <AuthLogin />
  </UiViewFormLayout>
</template>
