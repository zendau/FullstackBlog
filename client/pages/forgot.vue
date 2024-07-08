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

async function onResetForm(emailData: string) {
  const res = await userStore.sendConfirmCode(emailData)

  if (!res) return

  email.value = emailData
  isShowConfirmCode.value = true
}

function onResetConfimrCode() {
  isShowConfirmCode.value = false
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
      @on-reset="onResetConfimrCode"
    />
    <AuthReset v-else @on-reset="onResetForm" />
  </UiViewFormLayout>
</template>

<style lang="scss" scoped></style>
