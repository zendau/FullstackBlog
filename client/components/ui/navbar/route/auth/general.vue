<script setup lang="ts">
const userStore = useUserStore()
</script>

<template>
  <div class="navbar__item">
    <NuxtLink to="/create"> Create </NuxtLink>
  </div>
  <div class="navbar__item">
    <NuxtLink :to="`/user/${userStore.data?.id}`"> Account </NuxtLink>
  </div>
</template>

<style lang="scss" scoped></style>
