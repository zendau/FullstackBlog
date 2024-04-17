<script setup lang="ts">
const { id, title, description } = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="cart__item">
    <NuxtImg loading="lazy" src="/item.jpg" class="cart__item--img" alt="" />
    <div class="mt-3 space-y-2 text-center">
      <h1 class="">
        <NuxtLink :to="`/post/${id}`">
          {{ title }}
        </NuxtLink>
      </h1>
      <p class="">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.cart {
  &__item {
    display: flex;
    flex-direction: column;

    &--img {
      height: auto;
      widows: 100%;
    }
  }
}
</style>
