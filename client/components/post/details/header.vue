<script setup lang="ts">
// const { data } = storeToRefs(useUserStore())

const { post } = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

// const isPostAuthor = computed(() => data.value.id === post.user_id)
const isPostAuthor = computed(() => post.user_id === 1)
</script>

<template>
  <div>
    <p>userId: {{ post.user_id }}</p>
    <p>view: {{ post.view }}</p>
    <p>price: {{ post.price }}</p>
    <p>discount: {{ post.discount }}</p>
    <p>created: {{ post.created_at }}</p>
  </div>
  <div v-if="isPostAuthor">Edit</div>
</template>

<style lang="scss" scoped></style>
