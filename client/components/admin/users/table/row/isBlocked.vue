<script setup lang="ts">
const { row } = defineProps<{
  row: IUser
}>()

const adminStore = useAdminStore()

function onBlock(row: IUser) {
  row.isBlocked = true
  adminStore.blockUser(row.id)
}

function onUnblock(row: IUser) {
  row.isBlocked = false
  adminStore.unBlockUser(row.id)
}
</script>

<template>
  <UButton v-if="row.isBlocked" color="green" @click="onUnblock(row)">
    Unblock
  </UButton>
  <UButton v-else color="red" @click="onBlock(row)">Block</UButton>
</template>

<style lang="scss" scoped></style>
