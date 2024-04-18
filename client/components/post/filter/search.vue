<script setup lang="ts">
const articleParams = useArticleParamsStore()

function onInpitTitle() {
  if (articleParams.search) {
    articleParams.addQuery("search")
  } else {
    articleParams.removeQuery("search")
  }
}

watch(() => articleParams.search, useDebounceFn(onInpitTitle, 500))
</script>

<template>
  <div>
    <UFormGroup label="Title">
      <UInput v-model="articleParams.search" placeholder="Search post..." />
    </UFormGroup>
  </div>
</template>

<style scoped></style>
