<script setup lang="ts">
const { data } = storeToRefs(useArticleStore())
</script>

<template>
  <div v-if="!data.length">no posts</div>
  <PostPaginationList />
  <!-- <PostInfinityList /> -->
</template>

<style lang="scss" scoped></style>
