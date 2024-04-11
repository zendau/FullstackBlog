<script setup lang="ts">
interface IPost {
  name: string
  content: string
  fetchTime?: Date
}

const { params } = useRoute()

const { data: post } = await useFetch<IPost>(
  `https://api.fakestorejson.com/api/v1/public/products/${params.id}`,
  {
    key: `post/${params.id}`,
  },
)
</script>

<template>
  <div v-if="!post">Post not found</div>
  <div v-else>
    <NuxtImg src="/item.jpg" />
    <h1>{{ post.name }}</h1>
    <p>{{ post.content }}</p>
  </div>
</template>

<style scoped></style>
