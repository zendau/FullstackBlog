<script setup lang="ts">
const authStore = useAuthStore()

const isOpenMenu = ref(false)
</script>

<template>
  <header>
    <nav class="navbar" :class="{ 'navbar--active': isOpenMenu }">
      <div
        class="navbar__btn"
        :class="{ 'navbar__btn--open': isOpenMenu }"
        @click="isOpenMenu = !isOpenMenu"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="navbar__container" @click="isOpenMenu = false">
        <div class="navbar__list">
          <UiNavbarRouteCommon />
          <UiNavbarRouteAuthGeneral v-if="authStore.isAuth" />
        </div>
        <UiNavbarRouteAuthProfile v-if="authStore.isAuth" />
        <UiNavbarRoutePublic v-else />
      </div>
      <div class="overlay" @click="isOpenMenu = false"></div>
    </nav>
  </header>
</template>

<style lang="scss">
.navbar {
  height: 60px;
  background-color: var(--color-primary);
  padding: 0 15px;
  border-bottom: 1px solid #d5dddf;

  &__container {
    height: 100%;
    display: grid;
    justify-items: center;
    grid-template-columns: 2fr 1fr;
  }

  &__list {
    width: 80%;
    display: flex;
    height: 100%;
  }

  &__item {
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: 10px;
    cursor: pointer;
    text-decoration: none;
    color: var(--color-font);
    position: relative;
    width: 110px;

    a,
    button {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    &:hover {
      // transition: all 0.5s ease;
      background-color: var(--color-accent);
      border-radius: 2px;
    }

    .router-link-active,
    .router-link-exact-active {
      color: var(--color-secondary-btn);

      &:after {
        content: "";
        display: block;
        width: 100%;
        height: 2px;
        position: absolute;
        background-color: var(--color-secondary-btn);
        bottom: 0;
        left: 0;
      }
    }
  }
}

@media (max-width: 820px) {
  .navbar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    &--active {
      .navbar__container {
        visibility: visible;
        grid-template-columns: 1fr;
      }
      .navbar__item--active {
        visibility: visible;
        position: relative;
        text-align: left;
        width: 100%;
        justify-content: flex-start;
        background-color: #e9e9e9;
        border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      }

      .navbar__list {
        height: 100%;
      }

      .navbar__container {
        min-height: 320px;
      }

      .navbar__item {
        &:hover {
          background-color: var(--color-accent);
        }
      }

      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
      }
    }

    &__container {
      position: absolute;
      top: 0;
      left: 0;
      flex-direction: column;
      width: 100%;
      z-index: 10;
      visibility: hidden;
      height: 0;
    }

    &__item {
      margin-left: 0;

      background-color: #e9e9e9;
      width: 100%;
      font-size: 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      transition: none;
      &:hover {
        background: none;
      }

      a,
      button {
        max-height: 30px;
        box-sizing: border-box;
        padding: 32px 15px;
      }

      &--active {
        visibility: visible;
        position: absolute;
        box-sizing: border-box;
        text-align: center;
        width: 100%;
        justify-content: center;
        background-color: var(--color-primary);
        border-bottom: none;

        &:after {
          display: none;
        }
      }
    }

    &__list {
      width: 100%;
      flex-direction: column;
    }

    &__btn {
      z-index: 15;
      width: 46px;
      height: 35px;
      position: relative;
      transform: rotate(0deg);
      transition: color 0.5s ease-in-out;
      cursor: pointer;

      &:hover {
        opacity: 0.65;
      }

      span {
        display: block;
        position: absolute;
        height: 7px;
        width: 100%;
        background-color: #d3531a;
        border-radius: 9px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: 0.25s ease-in-out;
      }

      span:nth-child(1) {
        top: 0px;
      }

      span:nth-child(2),
      span:nth-child(3) {
        top: 14px;
      }
      span:nth-child(4) {
        top: 28px;
      }

      &--open span:nth-child(1) {
        top: 18px;
        width: 0%;
        left: 50%;
      }

      &--open span:nth-child(2) {
        transform: rotate(45deg);
      }

      &--open span:nth-child(3) {
        transform: rotate(-45deg);
      }

      &--open span:nth-child(4) {
        top: 18px;
        width: 0%;
        left: 50%;
      }
    }
  }
}
</style>
