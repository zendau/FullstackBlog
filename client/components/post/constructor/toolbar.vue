<script setup lang="ts">
const isOpenLinkForm = ref(false)
const linkHref = ref("")

const selectedRange = ref()

function setBolt() {
  document.execCommand("bold", false, undefined)
}

function setItalic() {
  document.execCommand("italic", false, undefined)
}

function setLink() {
  const selection = window.getSelection()

  if (!selection) return
  const range = selection.getRangeAt(0)

  if (!range) return

  selectedRange.value = range
}

function applyLink() {
  const selection = window.getSelection()

  selection?.removeAllRanges()

  selection?.addRange(selectedRange.value)

  document.execCommand("createLink", false, `http://${linkHref.value}`)
}
</script>

<template>
  <div class="toolbar absolute top-0 right-0">
    <UButton @click="setBolt">B</UButton>
    <UButton @click="setItalic">I</UButton>
    <UPopover v-model:open="isOpenLinkForm">
      <UButton label="A" @click="setLink" />

      <template #panel>
        <div class="p-4 z-10">
          <input v-model="linkHref" type="text" placeholder="Paste link..." />
          <UButton label="Apply" @click="applyLink" />
        </div>
      </template>
    </UPopover>
  </div>
</template>

<style lang="scss" scoped>
.toolbar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  position: fixed;
  z-index: 10;
  width: 120px;
  right: 20px;
  top: 100px;

  button {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
