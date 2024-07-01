<script setup lang="ts">
definePageMeta({
  middleware: "public",
})

const isShowConfirmCode = ref(false)
const userStore = useUserStore()
const router = useRouter()

async function onActiveAccount(confirmCode: string) {
  const resStatus = await userStore.activateAccount({
    confirmCode,
  })

  if (resStatus) {
    await router.push("/")
  }
}

function onSubmit() {
  isShowConfirmCode.value = true
}
</script>
<template>
  <UiViewFormLayout>
    <UserConfirmCode v-if="isShowConfirmCode" :on-send="onActiveAccount" />
    <AuthRegister v-else @on-sumbit="onSubmit" />
  </UiViewFormLayout>
</template>

<style scoped lang="scss"></style>
