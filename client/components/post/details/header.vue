<script setup lang="ts">
const { post } = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const isPostAuthor = computed(() => post.author.id === 1)
</script>

<template>
  <div>
    <NuxtLink :to="`/user/${post.author.id}`">
      auhor: {{ post.author.email }}
    </NuxtLink>
    <p>view: {{ post.counterReads }}</p>
  </div>
  <div v-if="isPostAuthor">Edit</div>
</template>

<style lang="scss" scoped></style>
