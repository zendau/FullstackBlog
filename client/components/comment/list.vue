<script setup lang="ts">
import { vIntersectionObserver } from "@vueuse/components"

const commentStore = useCommentStore()

const { pending } = useLazyAsyncData(
  "comment",
  async () => await commentStore.fetch(),
  {
    server: true,
  },
)

function onIntersectionObserver([
  { isIntersecting },
]: IntersectionObserverEntry[]) {
  if (commentStore.isLoading || !commentStore.hasMore || !isIntersecting) return
  commentStore.fetch()
}

const isShowMoreComments = ref(false)
</script>

<template>
  <CommentEmpty v-if="commentStore.data.length === 0" />
  <template v-else>
    <CommentCard
      v-for="comment in commentStore.data"
      :key="comment.id"
      :message="comment.message"
      :date="comment.createdDate"
      :author="comment.user"
    />

    <UiLoader v-if="pending || commentStore.isLoading" />
    <div
      v-if="isShowMoreComments"
      v-intersection-observer="onIntersectionObserver"
      class="observer"
    ></div>
    <UButton
      v-else
      class="mx-auto mt-3 block"
      @click="isShowMoreComments = !isShowMoreComments"
    >
      More
    </UButton>
  </template>
</template>

<style lang="scss" scoped></style>
