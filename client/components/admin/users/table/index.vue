<script setup lang="ts">
const adminStore = useAdminStore()

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "rating",
    label: "Rating",
  },
  {
    key: "counterPosts",
    label: "Posts",
  },
  {
    key: "counterComments",
    label: "Comments",
  },
  {
    key: "counterLikes",
    label: "Likes",
  },
  {
    key: "counterDislikes",
    label: "Dislikes",
  },
  {
    key: "isBlocked",
    label: "Is blocked",
  },
  {
    key: "isActivated",
    label: "Is activated",
  },
  {
    key: "roles",
    label: "Roles",
  },
]
</script>

<template>
  <UTable
    :loading="adminStore.isLoading"
    :columns="columns"
    :rows="adminStore.data"
  >
    <template #isBlocked-data="{ row }">
      <AdminUsersTableRowIsBlocked :row="row" />
    </template>

    <template #roles-data="{ row }">
      <AdminUsersTableRowRoles :row-roles="row.roles" :user-id="row.id" />
    </template>
  </UTable>
</template>

<style lang="scss" scoped></style>
