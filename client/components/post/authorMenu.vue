<script setup lang="ts">
const articleStore = useArticleStore()
const router = useRouter()

const articleId = inject("articleId", "")

async function onDeleteProduct() {
  if (!articleId) return

  const res = await articleStore.remove(articleId)

  if (!res) return
  router.push("/")
}
</script>

<template>
  <NuxtLink :to="`/admin/edit/article/${articleId}`">Change</NuxtLink>

  <UiModalConfirm
    button-text="Delete"
    message="Do you really want to delete this article?"
    @confirm="onDeleteProduct"
  />
</template>

<style lang="scss" scoped></style>
