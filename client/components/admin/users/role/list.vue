<script setup lang="ts">
import type { Roles } from "../../../../stores/user"

const { roles } = defineProps<{
  roles: Roles[]
}>()
</script>

<template>
  <ul>
    <AdminUsersRoleItem v-for="role in roles" :key="role" :role="role" />
  </ul>
</template>

<style lang="scss" scoped></style>
