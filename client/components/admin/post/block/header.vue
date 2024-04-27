<script setup lang="ts">
defineExpose({
  getData,
})

const text = ref("")

function getData() {
  if (!text.value) return

  return {
    block: "header",
    content: text.value,
  }
}

function onInput(e: Event) {
  text.value = (e.target as HTMLInputElement).innerHTML
}
</script>

<template>
  <!-- Заголовок 1 -->
  <h1 placeholder="Заголовок 1" contenteditable="true" @input="onInput"></h1>
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
