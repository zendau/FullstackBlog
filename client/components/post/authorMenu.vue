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
  <div class="flex justify-end mt-3 items-center">
    <NuxtLink
      :to="`/edit/${articleId}`"
      class="mr-3 hover:text-primary transition-colors"
    >
      Change
    </NuxtLink>

    <UiModalConfirm
      button-text="Delete"
      message="Do you really want to delete this article?"
      @confirm="onDeleteProduct"
    />
  </div>
</template>

<style lang="scss" scoped></style>
