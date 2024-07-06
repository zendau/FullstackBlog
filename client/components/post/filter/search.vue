<script setup lang="ts">
const articleParams = useArticleParamsStore()

function onInpitTitle() {
  if (articleParams.search === undefined) return
  if (articleParams.search) {
    articleParams.addQuery("search")
  } else {
    articleParams.removeQuery("search")
  }
}

const onInputHandler = useDebounceFn(onInpitTitle)
</script>

<template>
  <UInput
    v-model="articleParams.search"
    icon="i-heroicons-magnifying-glass-20-solid"
    placeholder="Search post..."
    class="col-start-1 col-end-4 w-full mb-1"
    @input="onInputHandler"
  />
</template>

<style scoped></style>
