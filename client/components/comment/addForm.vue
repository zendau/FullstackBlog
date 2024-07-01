<script setup lang="ts">
const articleId = inject("articleId", "")

const commentText = ref("")
const commentStore = useCommentStore()

function onSendMessage() {
  const commentBody = {
    postId: articleId,
    message: commentText.value,
  }

  commentText.value = ""

  commentStore.add(commentBody)
}
</script>

<template>
  <form class="flex flex-col mx-5">
    <p class="text-lg font-medium px-6 py-3">
      {{ commentStore.total }} comments
    </p>
    <span class="form" contenteditable placeholder="Press comment..."></span>
    <UButton class="mt-3 self-end px-5" @click="onSendMessage"> Send </UButton>
  </form>
</template>

<style lang="scss" scoped>
.form {
  white-space: pre-wrap;
  display: inline-block;
  width: 100%;
  max-width: 100%;
  height: 100px;
  max-height: 300px;
  overflow: auto;
  background-color: #fff;
  border-radius: 12px;
  padding: 11px;
  border: 1px solid #bebebe;

  span {
    width: 100%;
  }

  &:focus {
    outline-color: var(--color-secondary-btn);
  }
}

[placeholder]:empty::before {
  content: attr(placeholder);
  color: #555;
}

[placeholder]:empty:focus::before {
  content: "";
}
</style>
