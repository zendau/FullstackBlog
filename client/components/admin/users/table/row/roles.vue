<script setup lang="ts">
import { Roles } from "../../../../../stores/user"

const { rowRoles, userId } = defineProps<{
  rowRoles: Roles[]
  userId: string
}>()

const selectedRoles = toRef(rowRoles)

const adminStore = useAdminStore()

function onRoleChange(roles: Roles[], id: string) {
  adminStore.setUserRoles(id, roles)
}
</script>

<template>
  <USelectMenu
    v-model="selectedRoles"
    multiple
    :options="Object.values(Roles)"
    @update:model-value="(roles: Roles[]) => onRoleChange(roles, userId)"
  />

  <ul>
    <li v-for="role in selectedRoles" :key="role">
      {{ role }}
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
