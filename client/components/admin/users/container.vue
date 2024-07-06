<script setup lang="ts">
const adminStore = useAdminStore()

function onPaginationChange(page: number) {
  adminStore.page = page
  adminStore.fetch({ isRewrite: true, params: {} })
}
</script>

<template>
  <div class="p-3">
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <AdminUsersSearch />
    </div>
    <AdminUsersTable />
    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination
        v-model="adminStore.page"
        :page-count="adminStore.count"
        :total="adminStore.total"
        show-last
        show-first
        @update:model-value="onPaginationChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
