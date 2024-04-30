<script setup lang="ts">
const authStore = useAuthStore()
</script>

<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li class="navbar__item">
        <NuxtLink to="/"> List posts </NuxtLink>
      </li>
      <li class="navbar__item">
        <NuxtLink to="/static"> Info </NuxtLink>
      </li>
    </ul>
    <UiNavbarPublic v-if="!authStore.isAuth" />
    <UiNavbarAuth v-else />
  </nav>
</template>

<style lang="scss">
.navbar {
  height: 60px;
  width: 100%;
  display: flex;
  background-color: rgb(185, 185, 185);
  justify-content: space-between;
  padding: 0 30px;

  &__list {
    display: flex;
    justify-items: center;
    align-items: center;
  }

  &__item {
    height: 100%;
    display: block;
    padding: 0 10px;
    min-width: 100px;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      background-color: gray;
      color: white;

      transition: 0.3s ease;

      &:hover {
        background-color: black;
      }
    }
  }
}
</style>
