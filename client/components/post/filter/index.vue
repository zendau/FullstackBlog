<script setup lang="ts">
const { fetch } = useArticleStore()
const articleParams = useArticleParamsStore()
const { isFilter } = storeToRefs(articleParams)
const { reset } = articleParams

watch(isFilter, (status) => {
  if (status) return
  fetch({ isRewrite: true })
})
</script>

<template>
  <div class="container">
    {{ articleParams.isFilter }}
    <PostFilterSearch />
    <PostFilterCategories />
    <button @click="reset">reset</button>
  </div>
</template>

<style scoped>
.container {
  width: 400px;
  margin: 20px auto;
}
</style>
