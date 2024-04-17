<script setup lang="ts"></script>

<template>
  <div class="cart__container">
    <slot />
  </div>
</template>

<style lang="scss">
.cart {
  background-color: red;
  &__container {
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 15px;
  }
}
</style>
