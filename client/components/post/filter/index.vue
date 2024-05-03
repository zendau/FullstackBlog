<script setup lang="ts">
const articleParams = useArticleParamsStore()
const { reset } = articleParams
</script>

<template>
  <div class="container">
    <PostFilterSearch />
    <PostFilterSort />
    <UButton @click="reset">reset</UButton>
  </div>
</template>

<style scoped>
.container {
  width: 400px;
  margin: 20px auto;
}
</style>
