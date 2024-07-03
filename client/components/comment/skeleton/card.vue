<script setup lang="ts"></script>

<template>
  <div class="mt-5">
    <USkeleton class="h-6 w-36 skeleton" />
    <USkeleton class="h-5 mt-1 w-36 skeleton" />
    <USkeleton class="h-9 mt-3 w-3/4 skeleton" />
  </div>
</template>

<style lang="scss" scoped>
.skeleton {
  background-color: var(--color-primary);
}
</style>
