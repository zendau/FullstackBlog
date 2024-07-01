<script setup lang="ts">
interface IUser {
  counterLikes: number
  counterDislikes: number
  rating: number
  id: string
  isBlocked: boolean
  email: string
  counterPosts: number
  counterComments: number
}

const { params } = useRoute()
const userId = params.id as string

provide("userId", userId)

const { data, pending } = useLazyAsyncData<IUser>(
  `user/${userId}`,
  async () => await useApiFetch(`user/data/${userId}`),
  {
    server: true,
  },
)
</script>

<template>
  <div v-if="pending"><UiLoader /></div>
  <template v-else>
    <div v-if="!data">not found</div>

    <div v-else class="mt-4">
      <h1 class="text-xl font-medium">{{ data.email }}</h1>
      <p class="text-sm">
        {{ data.isBlocked ? "Blocked" : "Not blocked" }} account status
      </p>
      <p class="flex items-center my-3">
        <UIcon name="i-heroicons-trophy mr-2 text-3xl" />
        {{ data.rating }}
      </p>

      <div class="flex my-3">
        <p class="flex items-center mr-4">
          <UIcon name="i-iconamoon-like" class="text-3xl mr-2" />
          {{ data.counterLikes }}
        </p>
        <p class="flex items-center mr-4">
          <UIcon name="i-iconamoon-dislike" class="text-3xl mr-2" />{{
            data.counterDislikes
          }}
        </p>
      </div>
      <UiTabView>
        <UiTabItem :title="`Articles ${data.counterPosts}`">
          <UserPostList />
        </UiTabItem>
        <UiTabItem :title="`Comments ${data.counterComments}`">
          <UserCommentList />
        </UiTabItem>
      </UiTabView>
    </div>
  </template>
</template>

<style lang="scss" scoped></style>
