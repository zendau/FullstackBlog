<script setup lang="ts">
const adminStore = useAdminStore()

const searchValue = ref("")

const onInputHandler = useDebounceFn(function onInputChange(event: any) {
  const searchValue = event.target.value

  adminStore.page = 1
  if (searchValue.length) {
    adminStore.fetch({
      isRewrite: true,
      params: { substring: event.target.value },
    })
  } else {
    adminStore.fetch({ isRewrite: true, params: {} })
  }
})
</script>

<template>
  <UInput
    v-model="searchValue"
    placeholder="Filter people..."
    @input="onInputHandler"
  />
</template>

<style lang="scss" scoped></style>
