<script setup lang="ts">
const { params } = useRoute()
const userId = params.id as string

provide("userId", userId)

const { data, pending } = await useAsyncData(
  `user/${userId}`,
  async () => await useApiFetch(`user/data/${userId}`),
  {
    server: true,
  },
)
</script>

<template>
  {{ pending }}
  <div>{{ data }}</div>

  <UiTabView>
    <UiTabItem title="Posts">
      <UserPostList />
    </UiTabItem>
    <UiTabItem title="Comments">
      <UserCommentList />
    </UiTabItem>
  </UiTabView>
</template>

<style lang="scss" scoped></style>
