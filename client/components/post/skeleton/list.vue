<script setup lang="ts">
const { count } = storeToRefs(useArticleStore())
</script>

<template>
  <div class="cart__container">
    <PostSkeletonCard v-for="item of count" :key="item" />
  </div>
</template>

<style lang="scss" scoped></style>
