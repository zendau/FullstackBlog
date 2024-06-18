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

const text = ref(content)

function getData() {
  if (!text.value) return

  return {
    type: "header",
    content: text.value,
  }
}

function onInput(e: Event) {
  text.value = (e.target as HTMLInputElement).innerHTML
}
</script>

<template>
  <h1
    :placeholder="isEdit ? 'Заголовок 1' : undefined"
    :contenteditable="isEdit || undefined"
    @input="onInput"
    v-html="content"
  ></h1>
</template>

<style lang="scss" scoped>
h1 {
  font-weight: 500;
  font-size: 22px;
  line-height: 30px;
  padding-top: 6px;
  padding-bottom: 6px;
  outline: none;
}
</style>
