<script setup lang="ts">
import type { IArticle } from "../../stores/article"

const { post } = withDefaults(
  defineProps<{
    post: IArticle
    isExtended?: boolean
  }>(),
  { isExtended: false },
)
const { addTag } = useArticleParamsStore()

const url = import.meta.env.VITE_API
</script>

<template>
  <div class="cart__item">
    <div>
      <p>{{ post.author.email }}</p>
      <p>{{ dateFormat(post.createdDate) }}</p>
    </div>
    <h1 class="">
      <NuxtLink :to="`/post/${post.id}`">
        {{ post.title }}
      </NuxtLink>
    </h1>
    <NuxtImg
      loading="lazy"
      :src="`${url}/image/${post.file.fileName}`"
      class="cart__item--img"
      alt=""
    />
    <div class="mt-3 space-y-2 text-center">
      <p class="">
        {{ post.preview }}
      </p>
    </div>
    <div v-if="isExtended">
      <p>
        tags:
        <span v-for="tag in post.tags" :key="tag" @click="addTag(tag)">
          {{ tag }}
          <br />
        </span>
      </p>
      <p>rating: {{ post.rating }}</p>
      <p>timeRead: {{ post.timeRead }}</p>
      <p>counterReads: {{ post.counterReads }}</p>
      <p>counterComments: {{ post.counterComments }}</p>
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
