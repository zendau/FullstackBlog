<script setup lang="ts">
import type { IArticle } from "../../stores/article"

const { params } = useRoute()
const userStore = useUserStore()
const articleId = params.id as string

provide("articleId", articleId)

const { data: article, pending } = await useLazyAsyncData<IArticle>(
  `post/${articleId}`,
  () => useApiFetch(`post/get/${articleId}`),
)
</script>

<template>
  <PostSkeletonBody v-if="pending" />
  <template v-else>
    <PostNotFount v-if="!article" :id="articleId" />

    <template v-else>
      <PostAuthorMenu v-if="userStore.data?.id === article.author.id" />
      <PostDetailsHeader :post="article" />
      <NuxtImg
        :src="getApiFile(article.file.fileName)"
        loading="lazy"
        class="mb-6"
      />
      <PostBlocks :blocks="article.blocks" />
      <PostDetailsFooter />
    </template>
  </template>
</template>

<style scoped></style>
