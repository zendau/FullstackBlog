<script setup lang="ts">
const { isAuth } = storeToRefs(useAuthStore())

const articleId = inject("articleId", "")

const isError = ref(false)
const reactingStatus = ref<boolean | "null">()

onMounted(async () => {
  if (!isAuth.value) return

  const status = await useApiFetch<boolean | "null">("reaction/status", {
    method: "get",
    query: {
      postId: articleId,
    },
  })
  reactingStatus.value = status
})

function checkAuth() {
  if (isAuth.value) return true

  isError.value = true

  setTimeout(() => (isError.value = false), 50000)

  return false
}

function setLike() {
  if (!checkAuth()) return

  reactingStatus.value = reactingStatus.value === true ? "null" : true

  useApiFetch("reaction/set", {
    method: "patch",
    query: {
      postId: articleId,
      isLiked: reactingStatus.value,
    },
  })
}

function setDislike() {
  if (!checkAuth()) return

  reactingStatus.value = reactingStatus.value === false ? "null" : false

  useApiFetch("reaction/set", {
    method: "patch",
    query: {
      postId: articleId,
      isLiked: reactingStatus.value,
    },
  })
}

function closeErrorAlert() {
  isError.value = false
}
</script>

<template>
  <UAlert
    v-if="isError"
    icon="i-heroicons-user-16-solid"
    color="red"
    variant="solid"
    title="Authorization is required"
    description="For this action, please log in"
    :close-button="{
      icon: 'i-heroicons-x-mark-20-solid',
      color: 'gray',
      variant: 'link',
      padded: false,
    }"
    @close="closeErrorAlert"
  />
  <div class="flex justify-center my-7">
    <UIcon
      name="i-iconamoon-like"
      class="text-3xl cursor-pointer mx-2"
      :class="{ 'bg-primary-500': reactingStatus === true }"
      @click="setLike"
    />
    <UIcon
      name="i-iconamoon-dislike"
      class="text-3xl cursor-pointer mx-2"
      :class="{ 'bg-primary-500': reactingStatus === false }"
      @click="setDislike"
    />
  </div>
</template>

<style lang="scss" scoped></style>
