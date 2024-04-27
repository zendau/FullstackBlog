<script setup lang="ts">
defineExpose({
  getData,
})

const text = ref("")

function getData() {
  if (!text.value) return

  return {
    block: "text",
    content: text.value,
  }
}

function onKeyDown(event: any) {
  if (event.code !== "Backspace") {
    return
  }

  const targetText = event.target.textContent.trim()
  if (targetText.length === 0) {
    event.preventDefault()
  }
}

function onKeyUp(event: any) {
  text.value = event.target.innerHTML
}
</script>

<template>
  <p
    placeholder="Введите текст"
    contenteditable="true"
    @keydown="onKeyDown"
    @keyup="onKeyUp"
  ></p>
</template>

<style lang="scss" scoped></style>
