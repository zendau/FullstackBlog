<script setup lang="ts">
useHead({
  title: "Activate account",
})

definePageMeta({
  middleware: [
    function () {
      const userStore = useUserStore()

      if (userStore.data?.isActivated) {
        return navigateTo("/")
      }
    },
  ],
})

const userStore = useUserStore()
const router = useRouter()

useLazyAsyncData(() => userStore.sendConfirmCode(userStore.data?.email))

async function onActiveAccount(confirmCode: string) {
  const res = await userStore.activateAccount({ confirmCode })

  if (!res) return

  router.go(-2)
}
</script>

<template>
  <div>
    <h1 class="text-xl font-medium text-center my-3">Activate account</h1>

    <UserConfirmCode :on-send="onActiveAccount" />
  </div>
</template>

<style lang="scss" scoped></style>
