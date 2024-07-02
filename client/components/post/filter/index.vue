<script setup lang="ts">
const articleParams = useArticleParamsStore()
</script>

<template>
  <PostFilterSearch />
  <PostFilterSort />
  <UButton
    color="red"
    class="col-start-3 row-start-3 w-fit px-6"
    @click="articleParams.defaultFilter"
  >
    Reset
  </UButton>
</template>

<style scoped lang="scss"></style>
