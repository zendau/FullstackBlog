<script setup lang="ts">
import hljs from "highlight.js"
import "highlight.js/styles/atom-one-dark.min.css"

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

const languages = ["JAVASCRIPT", "PHP", "PYTHON", "RUST", "JAVA"]
const selectedLanguage = ref(languages[0])
const code = ref(content)

const hihgtlighCode = computed(() =>
  hljs.highlight(code.value, { language: selectedLanguage.value }),
)

function getData() {
  if (!code.value) return

  return {
    type: "code",
    content: code.value,
  }
}

function onInput(e: Event) {
  code.value = (e.target as HTMLInputElement).innerText
}
</script>

<template>
  <div :class="$style.container">
    <USelectMenu
      v-model="selectedLanguage"
      :class="$style.selectMenu"
      :options="languages"
    />
    <pre><code :contenteditable="isEdit" @input="onInput" v-html="hihgtlighCode.value"></code></pre>
  </div>
</template>

<style lang="scss" module>
.container {
  position: relative;
  width: 500px;
}

.selectMenu {
  position: absolute;
  width: 30%;
  right: -4%;
  top: 0;
}

pre {
  background-color: #282c34;
  min-height: 60px;
  width: 100%;
  border-radius: 10px;
  margin: 20px;
  padding: 15px;
  color: white;
}

code {
  outline: none;
}
</style>
