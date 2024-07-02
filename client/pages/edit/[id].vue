<script setup lang="ts">
const { params } = useRoute()
const articleId = params.id as string

const {
  pending,
  error,
  data: article,
} = useLazyAsyncData<IArticle>(
  `post/${articleId}`,
  async () => await useApiFetch(`post/get/${articleId}`),
  {
    server: true,
  },
)
</script>

<template>
  <UiLoader v-if="pending" />
  <AdminPostFormViewContainer v-else :error="error">
    <template #header>Edit article</template>
    <template #body>
      <AdminPostForm :article-data="article" />
    </template>
  </AdminPostFormViewContainer>
</template>
