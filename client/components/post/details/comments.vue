<script setup lang="ts">
const { isAuth } = storeToRefs(useAuthStore())
const { data } = storeToRefs(useUserStore())

const articleId = inject("articleId", "")

const commnentStore = useCommentStore()
commnentStore.postId = articleId

onUnmounted(() => commnentStore.$reset())
</script>

<template>
  <CommentBlocked v-if="data?.isBlocked" />
  <CommentNotActivated v-else-if="!data?.isActivated" />
  <CommentAddForm v-else-if="isAuth" />
  <CommentNoAuth v-else />
  <CommentList />
</template>

<style lang="scss" scoped></style>
