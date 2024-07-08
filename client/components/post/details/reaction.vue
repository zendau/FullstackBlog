<script setup lang="ts">
const { isAuth } = storeToRefs(useAuthStore())
const { data } = storeToRefs(useUserStore())

const articleId = inject("articleId", "")

const errorMessage = ref("")
const reactingStatus = ref<boolean | "null">()

onMounted(async () => {
  if (!checkAvailability()) return

  const status = await useApiFetch<boolean | "null">("reaction/status", {
    method: "get",
    query: {
      postId: articleId,
    },
  })
  reactingStatus.value = status
})

function checkAvailability() {
  if (!isAuth.value) {
    errorMessage.value = "For Reaction action, please log in"
    return false
  }

  if (data.value?.isBlocked) {
    errorMessage.value =
      "Reaction action is not available because the account is blocked"
    return false
  }

  if (!data.value?.isActivated) {
    errorMessage.value = "For Reaction action, please activate account"
    return false
  }

  setTimeout(() => (errorMessage.value = ""), 5000)

  return true
}

function setLike() {
  if (!checkAvailability()) return

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
  if (!checkAvailability()) return

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
  errorMessage.value = ""
}
</script>

<template>
  <UAlert
    v-if="errorMessage.length"
    icon="i-heroicons-user-16-solid"
    color="red"
    variant="solid"
    title="Access is restricted"
    :description="errorMessage"
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
      class="text-3xl cursor-pointer mx-2 disIcon"
      :class="{ 'bg-primary-500': reactingStatus === true }"
      :disabled="!!errorMessage"
      @click="setLike"
    />
    <UIcon
      name="i-iconamoon-dislike"
      class="text-3xl cursor-pointer mx-2 disIcon"
      :class="{ 'bg-primary-500': reactingStatus === false }"
      :disabled="!!errorMessage"
      @click="setDislike"
    />
  </div>
</template>

<style lang="scss">
.disIcon:disabled,
.disIcon[disabled] {
  cursor: not-allowed;
}
</style>
