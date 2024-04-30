<script setup lang="ts">
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
  <p v-if="message">{{ message }}</p>
  <UserConfirmCode
    v-if="isShowConfirmCode"
    :on-send="onSubmit"
    :email="email"
  />
  <AuthReset v-else @on-reset="onReset" />
</template>

<style lang="scss" scoped></style>
