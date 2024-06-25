<script setup lang="ts">
const { isAuth } = storeToRefs(useAuthStore())

const articleId = inject("articleId", "")

const commnentStore = useCommentStore()
commnentStore.postId = articleId

onUnmounted(() => commnentStore.$reset())
</script>

<template>
  <CommentAddForm v-if="isAuth" />
  <CommentNoAuth v-else />
  <CommentList />
</template>

<style lang="scss" scoped></style>
