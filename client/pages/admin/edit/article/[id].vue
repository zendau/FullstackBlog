<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "protect-by-auth",
})

const { params } = useRoute()
const articleId = params.id as string

const {
  pending,
  error,
  data: article,
} = await useAsyncData<IArticle>(
  `post/${articleId}`,
  async () => await useApiFetch(`post/get/${articleId}`),
  {
    server: true,
  },
)
</script>

<template>
  <div v-if="error">{{ error }}</div>
  <div v-else-if="pending">loagind</div>
  <AdminPostForm v-else :article-data="article" type="edit" />
</template>

<style scoped lang="scss"></style>
