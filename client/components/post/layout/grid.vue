<script setup lang="ts"></script>

<template>
  <div class="cart__container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.cart {
  &__container {
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 15px;
  }
}

@media (max-width: 820px) {
  .cart {
    &__container {
      grid-template-columns: 1fr;
    }
  }
}
</style>
