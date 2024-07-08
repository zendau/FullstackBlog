<script setup lang="ts">
const route = useRoute()

useHead({
  title: "Unavailable",
})

definePageMeta({
  middleware: [
    function () {
      const userStore = useUserStore()

      if (userStore.data?.isBlocked || !userStore.data?.isActivated) {
        return
      }

      return abortNavigation()
    },
  ],
})
</script>

<template>
  <div v-if="route.query.type === 'activate'">
    <h1>Activate account</h1>
    <NuxtLink to="/user/activate" class="text-sky-600">
      Click to activate
    </NuxtLink>
  </div>
  <div v-else-if="route.query.type === 'blocked'">
    <h1>Blocked account</h1>
    <p>To unblock, contact the administrator</p>
  </div>
</template>

<style lang="scss" scoped>
div {
  width: 100%;
  display: flex;
  margin-top: 80px;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 22px;
  margin-bottom: 12px;
}
</style>
