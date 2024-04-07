<script setup lang="ts">
const userStore = useUserStore()
</script>

<template>
  <div>
    <p>{{ userStore.isAuth ? "Auth" : "Not auth" }}</p>
    <div>
      <NuxtLink to="/"> List posts </NuxtLink>
      <NuxtLink to="/login"> Login </NuxtLink>
    </div>
    <slot />
  </div>
</template>
