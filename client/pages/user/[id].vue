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

const { data, pending, error } = useLazyAsyncData<IUser>(`user/${userId}`, () =>
  useApiFetch(`user/data/${userId}`),
)

const userName = computed(() => data.value?.email || "User")

useHead({
  title: () => `${userName.value} blog`,
})
</script>

<template>
  <UserSkeleton v-if="pending" />

  <template v-else>
    <UiErrorMessage
      v-if="error"
      class-data="mt-8"
      message="Unexpected error. Try later"
    />

    <template v-else>
      <UiErrorMessage v-if="!data" class-data="mt-8" message="User not found" />

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
</template>

<style lang="scss" scoped></style>
