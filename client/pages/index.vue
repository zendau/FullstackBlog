<script setup lang="ts"></script>

<template>
  <div class="page-container">
    <PostFilter />
    <PostSetting />
  </div>
  <PostView />
</template>

<style lang="scss" scoped>
.page-container {
  background-color: #fff;
  margin: 30px auto;
  box-shadow: 1px 1px 4px -1px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
}
</style>
