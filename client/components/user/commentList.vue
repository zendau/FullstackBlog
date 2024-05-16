<script setup lang="ts">
const userId = inject("userId", "")

const commnentStore = useCommentStore()
commnentStore.$reset()
commnentStore.authorId = userId
</script>

<template>
  <CommentList />
</template>

<style lang="scss" scoped></style>
