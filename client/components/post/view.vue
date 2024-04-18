<script setup lang="ts">
const { data, isLoading } = storeToRefs(useArticleStore())
</script>

<template>
  <PostEmpty v-if="!isLoading && !data.length" />
  <PostPaginationList />
  <!-- <PostInfinityList /> -->
</template>

<style lang="scss" scoped></style>
