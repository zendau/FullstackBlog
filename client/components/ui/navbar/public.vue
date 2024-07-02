<script setup lang="ts">
const authStore = useAuthStore()
</script>

<template>
  <ul v-if="!authStore.isAuth" class="navbar__list">
    <li class="navbar__item">
      <NuxtLink to="/register"> Register </NuxtLink>
    </li>
    <li class="navbar__item">
      <NuxtLink to="/login"> Login </NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
