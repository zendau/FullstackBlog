<script setup lang="ts">
const userStore = useUserStore()
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
    <ul v-if="!userStore.isAuth" class="navbar__list">
      <li class="navbar__item">
        <NuxtLink to="/login"> Register </NuxtLink>
      </li>
      <li class="navbar__item">
        <NuxtLink to="/login"> Login </NuxtLink>
      </li>
    </ul>
    <ul v-else class="navbar__list">
      <li class="navbar__item">
        <NuxtLink to="/" @click="userStore.logout"> Logout </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
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
