<script setup lang="ts">
interface IPost {
  name: string
  content: string
  fetchTime?: Date
}

const { params } = useRoute()
const articleId = params.id as string

provide("articleId", articleId)

const {
  pending,
  error,
  data: post,
} = await useAsyncData<IPost>(
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
  <PostNotFount v-if="!post" :id="articleId" />
  <template v-else>
    <PostDetailsHeader :post="post" />
    <NuxtImg src="/item.jpg" />
    <h1>{{ post.name }}</h1>
    <p>{{ post.content }}</p>
    <PostDetailsFouter />
  </template>
</template>

<style scoped></style>
