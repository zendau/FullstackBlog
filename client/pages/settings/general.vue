<script setup lang="ts">
definePageMeta({
  middleware: "private",
})

useHead({
  title: "General settings",
})

const userStore = useUserStore()
</script>

<template>
  <UiViewFormLayout>
    <SettingsUpdateData v-if="userStore.data?.isActivated" />
    <SettingsStatus v-else />
  </UiViewFormLayout>
</template>

<style lang="scss" scoped></style>
