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
  <PostFormViewContainer v-else :error="error">
    <template #header>Edit article</template>
    <template #body>
      <PostForm :article-data="article" />
    </template>
  </PostFormViewContainer>
</template>
