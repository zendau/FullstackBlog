<script setup lang="ts">
definePageMeta({
  middleware: "private",
})

const userStore = useUserStore()
</script>

<template>
  <SettingsUpdateData v-if="userStore.data?.isActivated" />
  <SettingsStatus v-else />
</template>

<style lang="scss" scoped></style>
