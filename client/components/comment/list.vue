<script setup lang="ts">
import { vIntersectionObserver } from "@vueuse/components"

const commentStore = useCommentStore()

const { pending } = await useAsyncData(
  "posts",
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
  <br />
  <p>{{ commentStore.total }} comments</p>

  <CommentCard
    v-for="comment in commentStore.data"
    :key="comment.id"
    :message="comment.slug"
    :date="comment.created_at"
    :author="comment.name"
  />

  <UiLoader v-if="pending || commentStore.isLoading" />
  <div
    v-if="isShowMoreComments"
    v-intersection-observer="onIntersectionObserver"
    class="observer"
  ></div>
  <UButton v-else @click="isShowMoreComments = !isShowMoreComments">
    Раскрыть
  </UButton>
</template>

<style lang="scss" scoped></style>
