<script setup lang="ts">
import type { PropType } from "vue"

interface postData {
  id: number
  name: string
  description: string
  created_at: string
  discount: number
  price: number
  view: number
}

const { post } = defineProps({
  post: {
    type: Object as PropType<postData>,
    required: true,
  },
  isExtended: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="cart__item">
    <NuxtImg loading="lazy" src="/item.jpg" class="cart__item--img" alt="" />
    <div class="mt-3 space-y-2 text-center">
      <h1 class="">
        <NuxtLink :to="`/post/${post.id}`">
          {{ post.name }}
        </NuxtLink>
      </h1>
      <p class="">
        {{ post.description }}
      </p>
    </div>
    <div v-if="isExtended">
      <p>date: {{ post.created_at }}</p>
      <p>discount: {{ post.discount }}</p>
      <p>price: {{ post.price }}</p>
      <p>view: {{ post.view }}</p>
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
