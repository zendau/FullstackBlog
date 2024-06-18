<script setup lang="ts">
interface IQuouteContent {
  text: string
  author: string
}

defineExpose({
  getData,
})

const { isEdit, content } = withDefaults(
  defineProps<{
    isEdit?: boolean
    content?: IQuouteContent
  }>(),
  {
    isEdit: false,
    content: () => ({
      author: "",
      text: "",
    }),
  },
)

const quoteData = reactive(content)

function getData() {
  if (!quoteData.text || !quoteData.author) return
  return {
    type: "quoute",
    content: {
      text: quoteData.text,
      author: quoteData.author,
    },
  }
}

function onInputText(e: Event) {
  quoteData.text = (e.target as HTMLInputElement).innerHTML
}

function onInputAuthor(e: Event) {
  quoteData.author = (e.target as HTMLInputElement).innerHTML
}
</script>

<template>
  <blockquote :class="$style.quote">
    <p
      :class="$style.text"
      :placeholder="isEdit ? 'Текст цитаты' : undefined"
      :contenteditable="isEdit || undefined"
      @input="onInputText"
      v-html="content.text"
    ></p>
    <p
      :class="$style.author"
      :placeholder="isEdit ? 'Подпись' : undefined"
      :contenteditable="isEdit || undefined"
      @input="onInputAuthor"
      v-html="content.author"
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
