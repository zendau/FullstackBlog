<script setup lang="ts">
useHead({
  title: "Create article",
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
