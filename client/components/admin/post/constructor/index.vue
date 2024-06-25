<script setup lang="ts">
import type { VueComponent } from "@/types"
import {
  PostBlockHeader,
  PostBlockCode,
  PostBlockList,
  PostBlockQuoute,
  PostBlockText,
  PostBlockSpace,
  PostBlockMediaFile,
  PostBlockMediaSlider,
} from "#components"

interface ICreateBlock {
  component: VueComponent
  content?: BlockContent
  ref?: { getData: () => IBlock }
}

defineExpose({
  getBlocksContent,
})

const { initBlocks } = defineProps<{
  initBlocks?: IBlock[]
}>()

const blocks = new Map<string, any>([])
blocks.set("header", PostBlockHeader)
blocks.set("text", PostBlockText)
blocks.set("quoute", PostBlockQuoute)
blocks.set("space", PostBlockSpace)
blocks.set("code", PostBlockCode)
blocks.set("list", PostBlockList)
blocks.set("file", PostBlockMediaFile)
blocks.set("slider", PostBlockMediaSlider)

const blocksKeys: string[] = [...blocks.keys()]

const createdBlocks = shallowReactive<Map<string, ICreateBlock>>(new Map())

initBlocksList()
function initBlocksList() {
  if (!initBlocks) return
  initBlocks.forEach((block) => selectBlock(block.type, block.content))
}

function removeBlock(key: string) {
  createdBlocks.delete(key)
}

function selectBlock(block: string, content?: BlockContent) {
  const component = blocks.get(block)
  if (!component) return

  const id = randomId()

  createdBlocks.set(id, { component, content })
}

const setBlockRef = (el: any, key: string) => {
  const blockComponent = createdBlocks.get(key)
  if (!blockComponent) return
  blockComponent.ref = el
}

function getBlocksContent() {
  if (!createdBlocks.size) {
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
    <AdminPostConstructorToolbar />
    <AdminPostBlockComponent
      v-for="postBlock in createdBlocks.entries()"
      :key="postBlock[0]"
      :component="postBlock[1].component"
      :data-id="postBlock[0]"
      :content="postBlock[1].content"
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
