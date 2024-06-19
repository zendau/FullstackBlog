<script setup lang="ts">
const { authorId } = defineProps<{
  authorId: string
}>()

const userStore = useUserStore()
const articleStore = useArticleStore()

const articleId = inject("articleId", "")

function onDeleteProduct() {
  if (!articleId) return

  articleStore.remove(articleId)
}
</script>

<template>
  <NuxtLink :to="`/admin/edit/article/${articleId}`">Change</NuxtLink>

  <div v-if="userStore.data?.id === authorId">
    <UiModalConfirm
      button-text="Delete"
      message="Do you really want to delete this article?"
      @confirm="onDeleteProduct"
    />
  </div>
</template>

<style lang="scss" scoped></style>
