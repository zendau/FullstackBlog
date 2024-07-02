<script setup lang="ts">
const userStore = useUserStore()
const authStore = useAuthStore()
</script>

<template>
  <ul class="navbar__list">
    <UiNavbarAdmin v-if="userStore.isAdmin" />
    <li class="navbar__item">
      <NuxtLink to="/settings"> Settings </NuxtLink>
    </li>
    <li class="navbar__item">
      <button @click="authStore.logout">Logout</button>
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
