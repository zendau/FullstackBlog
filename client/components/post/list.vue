<script setup lang="ts">
const { data: articles } = storeToRefs(useArticleStore())
</script>

<template>
  <PostLayoutSingl>
    <PostCard
      v-for="post of articles"
      :key="post.id"
      :post="post"
      :is-extended="true"
    />
  </PostLayoutSingl>
</template>

<style lang="scss">
.cart {
  background-color: red;
  &__container {
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 15px;
  }
}
</style>
