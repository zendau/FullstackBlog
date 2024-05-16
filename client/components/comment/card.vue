<script setup lang="ts">
interface IAuthor {
  email: string
  id: string
  isActivated: boolean
  isBlocked: boolean
}

const { author, date, message } = defineProps<{
  author: IAuthor
  date: string
  message: string
}>()
</script>

<template>
  <div class="comment__container">
    <NuxtLink :to="`/user/${author.id}`">Name: {{ author.email }}</NuxtLink>
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
