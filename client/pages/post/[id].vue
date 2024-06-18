<script setup lang="ts">
import type { IArticle } from "../../stores/article"

const { params } = useRoute()
const articleId = params.id as string

provide("articleId", articleId)

const {
  pending,
  error,
  data: article,
} = await useAsyncData<IArticle>(
  `post/${articleId}`,
  async () => await useApiFetch(`post/get/${params.id}`),
  {
    server: true,
  },
)
</script>

<template>
  {{ pending }}

  {{ error }}
  <PostNotFount v-if="!article" :id="articleId" />
  <template v-else>
    <PostDetailsHeader :post="article" />
    <NuxtImg src="/item.jpg" />
    <h1>{{ article.title }}</h1>
    <p>{{ article.preview }}</p>
    <PostBlocks :blocks="article.blocks" />
    <PostDetailsFouter />
  </template>
</template>

<style scoped></style>
