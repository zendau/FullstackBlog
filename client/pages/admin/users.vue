<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "protect-by-auth",
})

useHead({
  title: "Site users",
})

const adminStore = useAdminStore()

useLazyAsyncData("users", () =>
  adminStore.fetch({ isRewrite: true, params: {} }),
)
</script>

<template>
  <h1 class="text-center text-xl font-medium my-4">Users list</h1>
  <AdminUsersContainer />
</template>

<style scoped lang="scss"></style>
