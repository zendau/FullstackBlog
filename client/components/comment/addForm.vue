<script setup lang="ts">
const articleId = inject("articleId", "")

const commentEl = ref<any>()
const commentStore = useCommentStore()
const isEmptyCommentText = ref(true)

function onSendMessage() {
  const commentText = commentEl.value.innerHTML

  if (!commentText.length) return

  commentEl.value.innerHTML = ""
  isEmptyCommentText.value = true
  const commentBody = {
    postId: articleId,
    message: commentText,
  }

  commentStore.add(commentBody)
}

function onKeyUp(event: any) {
  const text = event.target.innerHTML

  if (text.length) {
    isEmptyCommentText.value = false
  } else {
    isEmptyCommentText.value = true
  }
}
</script>

<template>
  <form class="flex flex-col mx-5">
    <p class="text-lg font-medium px-6 py-3">
      {{ commentStore.total }} comments
    </p>
    <span
      ref="commentEl"
      class="form"
      contenteditable
      placeholder="Press comment..."
      @input="onKeyUp"
    ></span>
    <UButton
      :disabled="isEmptyCommentText"
      class="mt-3 self-end px-5"
      @click="onSendMessage"
    >
      Send
    </UButton>
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
