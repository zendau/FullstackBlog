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
  <form>
    <UTextarea
      v-model="commentText"
      color="primary"
      variant="outline"
      placeholder="Comment..."
    />
    <UButton v-if="commentText.length > 0" @click="onSendMessage">
      Send
    </UButton>
  </form>
</template>

<style lang="scss" scoped>
.fileUpload {
  label {
    cursor: pointer;
    display: block;
    height: 50px;
    width: 50px;
    font-size: 60px;
  }

  input {
    display: none;
  }
}

.preview {
  &-container {
    width: 250px;
    height: auto;
    position: relative;
  }

  &-img {
    height: 100%;
    width: 100%;
  }

  &-btn {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
