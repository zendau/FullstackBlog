<script setup lang="ts">
definePageMeta({
  middleware: "private",
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
