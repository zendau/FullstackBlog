<script setup lang="ts">
const isShowConfirmCode = ref(false)
const userStore = useUserStore()

function onSendConfirmCode() {
  userStore.sendConfirmCode(userStore.data?.email)
  isShowConfirmCode.value = true
}

async function onActiveAccount(event: { data: { confirmCode: string } }) {
  const resStatus = await userStore.activateAccount({
    confirmCode: event.data.confirmCode,
  })

  if (resStatus) {
    isShowConfirmCode.value = false
  }
}

function onReset() {
  isShowConfirmCode.value = false
}
</script>

<template>
  <UserConfirmCode
    v-if="isShowConfirmCode"
    :on-send="onActiveAccount"
    @on-reset="onReset"
  />
  <div v-else>
    <p>Status</p>
    <p v-if="userStore.data?.isBlocked">Account is blocked</p>
    <div>
      <p>Confirm email to activate account</p>
      <UButton @click="onSendConfirmCode">Активировать</UButton>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
