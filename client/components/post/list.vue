<script setup lang="ts">
const { data: articles } = storeToRefs(useArticleStore())
</script>

<template>
  <div class="cart__container">
    <PostCard
      v-for="post of articles"
      :id="post.id"
      :key="post.id"
      :description="post.description"
      :title="post.name"
    />
  </div>
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
