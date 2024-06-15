<script setup lang="ts">
defineExpose({
  getData,
})

const { isEdit, content } = withDefaults(
  defineProps<{
    isEdit?: boolean
    content?: string
  }>(),
  {
    isEdit: false,
    content: "",
  },
)

const media = ref()

function getData() {
  if (!media.value) return

  return {
    type: "file",
    content: media.value.getData(),
  }
}
</script>

<template>
  <AdminPostBlockMedia
    ref="media"
    type="file"
    :is-edit="isEdit"
    :content="content"
  />
</template>

<style lang="scss" scoped></style>
