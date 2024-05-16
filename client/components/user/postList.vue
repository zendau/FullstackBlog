<script setup lang="ts">
const articleParams = useArticleParamsStore()
const userId = inject("userId", "")

articleParams.authorId = userId
</script>

<template>
  <PostInfinityList />
</template>

<style lang="scss" scoped></style>
