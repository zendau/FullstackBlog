<script setup lang="ts">
const { author, date, message } = defineProps({
  author: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="comment__container">
    <p>Name: {{ author }}</p>
    <p>Message: {{ message }}</p>
    <p>Date: {{ date }}</p>
  </div>
</template>

<style lang="scss" scoped>
.comment {
  &__container {
    border: 1px solid black;
    padding: 15px;
    margin: 10px;
  }
}
</style>
