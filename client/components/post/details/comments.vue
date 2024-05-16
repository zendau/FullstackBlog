<script setup lang="ts">
const { isAuth } = storeToRefs(useAuthStore())

const articleId = inject("articleId", "")

const commnentStore = useCommentStore()
commnentStore.$reset()
commnentStore.postId = articleId
</script>

<template>
  <CommentAddForm v-if="isAuth" />
  <CommentNoAuth v-else />
  <CommentList />
</template>

<style lang="scss" scoped></style>
