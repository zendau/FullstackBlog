<script setup lang="ts"></script>

<template>
  <div class="cart__container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.cart {
  background-color: red;
  &__container {
    width: 80%;
    margin: 0 auto;
    display: block;
  }
}
</style>
