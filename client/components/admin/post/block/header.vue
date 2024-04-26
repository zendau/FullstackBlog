<script setup lang="ts">
const text = ref("")

function onInput(e: Event) {
  text.value = (e.target as HTMLInputElement).innerText
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
