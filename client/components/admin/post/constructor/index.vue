<script setup lang="ts">
import type { VueComponent } from "@/types"
import {
  AdminPostBlockHeader,
  AdminPostBlockCode,
  AdminPostBlockList,
  AdminPostBlockQuoute,
  AdminPostBlockText,
  AdminPostBlockSpace,
  AdminPostBlockMediaFile,
  AdminPostBlockMediaSlider,
} from "#components"

interface IBlockContent {
  block: string
  content: any
}

interface ICreateBlock {
  component: VueComponent
  ref?: { getData: () => IBlockContent }
}

defineExpose({
  getBlocksContent,
})

const errorMessage = ref("")

const blocks = new Map<string, any>([])
blocks.set("title", AdminPostBlockHeader)
blocks.set("text", AdminPostBlockText)
blocks.set("quoute", AdminPostBlockQuoute)
blocks.set("space", AdminPostBlockSpace)
blocks.set("code", AdminPostBlockCode)
blocks.set("list", AdminPostBlockList)
blocks.set("media", AdminPostBlockMediaFile)
blocks.set("slider", AdminPostBlockMediaSlider)

const blocksKeys: string[] = [...blocks.keys()]

const createdBlocks = shallowReactive<Map<number, ICreateBlock>>(new Map())

function removeBlock(key: number) {
  createdBlocks.delete(key)
}

function selectBlock(block: string) {
  const component = blocks.get(block)
  if (!component) return

  const id = new Date().getTime()

  createdBlocks.set(id, { component })
}

const setBlockRef = (el: any, key: number) => {
  const blockComponent = createdBlocks.get(key)
  if (!blockComponent) return
  blockComponent.ref = el
}

function getBlocksContent() {
  if (!createdBlocks.size) {
    errorMessage.value = "At least 1 block must be selected"

    setTimeout(() => {
      errorMessage.value = ""
    }, 5000)

    return
  }

  const blocksData = []

  for (const block of createdBlocks.values()) {
    if (!block.ref) continue
    blocksData.push(block.ref.getData())
  }

  return JSON.stringify(blocksData)
}
</script>

<template>
  <div class="editor">
    <h2>Article body conscructor</h2>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <AdminPostConstructorToolbar />

    <AdminPostBlockComponent
      v-for="postBlock in createdBlocks.entries()"
      :key="postBlock[0]"
      :component="postBlock[1].component"
      :data-id="postBlock[0]"
      @remove-block="removeBlock"
      @set-block-ref="setBlockRef"
    />
    <AdminPostConstructorMenu :list="blocksKeys" @select="selectBlock" />
  </div>
</template>

<style lang="scss">
.editor {
  padding: 15px;
  width: 100%;
}

[placeholder]:empty::after {
  content: attr(placeholder);
  color: #555;
}

[placeholder]:empty:focus::after {
  content: "";
}
</style>
