<script setup lang="ts">
interface IPost {
  name: string
  content: string
  fetchTime?: Date
}

const { params } = useRoute()
const articleId = params.id as string

const { data: post } = await useFetch<IPost>(
  `https://api.fakestorejson.com/api/v1/public/products/${params.id}`,
  {
    key: `post/${articleId}`,
  },
)
</script>

<template>
  <PostNotFount v-if="!post" :id="articleId" />
  <template v-else>
    <PostDetailsHeader />
    <NuxtImg src="/item.jpg" />
    <h1>{{ post.name }}</h1>
    <p>{{ post.content }}</p>
    <PostDetailsFoouter />
  </template>
</template>

<style scoped></style>
