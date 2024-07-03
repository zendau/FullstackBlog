<script setup lang="ts"></script>

<template>
  <div>
    <CommentSkeletonCard v-for="item of 10" :key="item" />
  </div>
</template>

<style lang="scss" scoped></style>
