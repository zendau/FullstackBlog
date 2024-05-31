<script setup lang="ts">
const isOpenLinkForm = ref(false)
const linkHref = ref("")
let linkRange: Range | null = null

function getSelectedRange() {
  const selection = window.getSelection()

  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    return range
  }

  return null
}

function setBolt() {
  const range = getSelectedRange()

  if (!range) return

  const span = document.createElement("span")
  span.style.fontWeight = "bold"

  range.surroundContents(span)
}

function setItalic() {
  const range = getSelectedRange()

  if (!range) return

  const span = document.createElement("span")
  span.style.fontStyle = "italic"

  range.surroundContents(span)
}

function setLink() {
  const range = getSelectedRange()

  if (!range) return
  linkRange = range
}

function applyLink() {
  if (!linkRange) return

  isOpenLinkForm.value = false
  const link = document.createElement("a")
  link.href = linkHref.value
  linkHref.value = ""
  link.style.fontWeight = "bold"
  link.style.color = "blue"
  linkRange.surroundContents(link)
  linkRange = null
}
</script>

<template>
  <div class="toolbar">
    <UButton @click="setBolt">B</UButton>
    <UButton @click="setItalic">I</UButton>
    <UPopover v-model:open="isOpenLinkForm">
      <UButton color="white" label="A" @click="setLink" />

      <template #panel>
        <div class="p-4">
          <UInput v-model="linkHref" placeholder="Paste link..." />
          <UButton label="Apply" @click="applyLink" />
        </div>
      </template>
    </UPopover>
  </div>
</template>

<style lang="scss" scoped>
.toolbar {
  position: fixed;
  right: 0;
}
</style>
