<script setup lang="ts">
definePageMeta({
  middleware: "public",
})

useHead({
  title: "Forgot",
})

const isShowConfirmCode = ref(false)
const userStore = useUserStore()

const email = ref("")
const message = ref("")

async function onSubmit(confirmCode: string) {
  const resStatus = await userStore.resetPassword({
    confirmCode,
    email: email.value,
  })

  if (!resStatus) return

  message.value = "new password already send"
}

function onReset(emailData: string) {
  userStore.sendConfirmCode(emailData)
  email.value = emailData
  isShowConfirmCode.value = true
}
</script>

<template>
  <UiViewFormLayout>
    <UAlert
      v-if="message"
      icon="i-heroicons-command-line"
      color="green"
      variant="solid"
      title="Error"
      :description="message"
      class="mb-3"
    />

    <UserConfirmCode
      v-if="isShowConfirmCode"
      :on-send="onSubmit"
      :email="email"
    />
    <AuthReset v-else @on-reset="onReset" />
  </UiViewFormLayout>
</template>

<style lang="scss" scoped></style>
