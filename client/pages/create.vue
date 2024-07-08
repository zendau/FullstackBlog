<script setup lang="ts">
useHead({
  title: "Create article",
})

definePageMeta({
  middleware: ["private", "activate"],
})
</script>

<template>
  <PostFormViewContainer>
    <template #header>Create article</template>
    <template #body>
      <PostForm />
    </template>
  </PostFormViewContainer>
</template>
