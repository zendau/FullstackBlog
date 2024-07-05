<script setup lang="ts">
const { params } = useRoute()
const articleId = params.id as string

const {
  pending,
  error,
  data: article,
} = await useLazyAsyncData<IArticle>(
  `post/${articleId}`,
  () => useApiFetch(`post/get/${articleId}`),
  {
    server: false,
  },
)

const articlePageTitle = computed(
  () => article.value?.title || import.meta.env.VITE_SITE_NAME,
)

useHead({
  title: () => `Edit '${articlePageTitle.value}'`,
})
</script>

<template>
  <UiLoader v-if="pending" full />
  <PostFormViewContainer v-else :error="error">
    <template #header>Edit article</template>
    <template #body>
      <PostForm :article-data="article" />
    </template>
  </PostFormViewContainer>
</template>
