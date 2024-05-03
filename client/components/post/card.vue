<script setup lang="ts">
interface IFile {
  fileName: string
  size: number
  mimetype: string
  id: string
}

interface IAuthor {
  email: string
  id: string
}

interface postData {
  id: string
  author: IAuthor
  counterLikes: number
  counterDislikes: number
  counterComments: number
  counterReads: number
  file: IFile
  body: string
  tags: string[]
  title: string
  timeRead: number
  createdDate: string
  rating: number
}

const { post } = withDefaults(
  defineProps<{
    post: postData
    isExtended?: boolean
  }>(),
  { isExtended: false },
)
const { addTag } = useArticleParamsStore()
</script>

<template>
  <div class="cart__item">
    <NuxtImg loading="lazy" src="/item.jpg" class="cart__item--img" alt="" />
    <div class="mt-3 space-y-2 text-center">
      <h1 class="">
        <NuxtLink :to="`/post/${post.id}`">
          {{ post.title }}
        </NuxtLink>
      </h1>
      <p class="">
        {{ post.body }}
      </p>
    </div>
    <div v-if="isExtended">
      <p>date: {{ post.createdDate }}</p>
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
