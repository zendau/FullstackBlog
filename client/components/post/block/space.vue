<script setup lang="ts">
defineExpose({
  getData,
})

withDefaults(
  defineProps<{
    isEdit?: boolean
    content?: string
  }>(),
  {
    isEdit: false,
    content: "",
  },
)

function getData() {
  return {
    type: "space",
  }
}
</script>

<template>
  <UDivider>
    <span class="text">***</span>
  </UDivider>
</template>

<style lang="scss" scoped>
.text {
  width: 100%;
  text-align: center;
  font-size: 30px;
}
</style>
