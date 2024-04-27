<script setup lang="ts">
defineExpose({
  getData,
})

const files = reactive([])
provide("files", files)

function getData() {
  if (!files.length) return

  return {
    block: "media",
    content: files,
  }
}
</script>

<template>
  <UiFileUpload />
  <AdminPostBlockMediaList />
</template>

<style lang="scss" scoped></style>
