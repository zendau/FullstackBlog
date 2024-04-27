<script setup lang="ts">
defineExpose({
  getData,
})
const text = ref("")
const author = ref("")

function getData() {
  if (!text.value || !author.value) return

  return {
    block: "quoute",
    content: {
      text: text.value,
      author: author.value,
    },
  }
}

function onInputText(e: Event) {
  text.value = (e.target as HTMLInputElement).innerHTML
}

function onInputAuthor(e: Event) {
  author.value = (e.target as HTMLInputElement).innerHTML
}
</script>

<template>
  <blockquote :class="$style.quote">
    <p
      :class="$style.text"
      placeholder="Текст цитаты"
      contenteditable="true"
      @input="onInputText"
    ></p>
    <p
      :class="$style.author"
      placeholder="Подпись"
      contenteditable="true"
      @input="onInputAuthor"
    ></p>
  </blockquote>
</template>

<style lang="scss" module>
.quote {
  padding: 15px;
  position: relative;
}

.quote ::before {
  content: "";
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 0;
  height: 100%;
  border-radius: 2px;
  border-left: 4px solid blue;
}

.quote .text {
  font-size: 28px;
  line-height: 40px;
}

.quote .author {
  margin-top: 8px;
  font-size: 15px;
  line-height: 22px;
}
</style>
