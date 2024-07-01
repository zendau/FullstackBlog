<template>
  <div class="view-layout">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.view-layout {
  background: #fff;
  max-width: 1280px;
  margin: 80px auto 0;
  padding: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
