<script setup lang="ts">
import type { VueComponent } from "@/types"
import {
  AdminPostBlockHeader,
  AdminPostBlockCode,
  AdminPostBlockList,
  AdminPostBlockQuoute,
  AdminPostBlockText,
  AdminPostBlockSpace,
  AdminPostBlockMedia,
  AdminPostBlockSlider,
} from "#components"

interface IBlockContent {
  block: string
  content: any
}

interface ICreateBlock {
  component: VueComponent
  ref?: { getData: () => IBlockContent }
}

const blocks = new Map<string, VueComponent>([])
blocks.set("title", AdminPostBlockHeader)
blocks.set("text", AdminPostBlockText)
blocks.set("quoute", AdminPostBlockQuoute)
blocks.set("space", AdminPostBlockSpace)
blocks.set("code", AdminPostBlockCode)
blocks.set("list", AdminPostBlockList)
blocks.set("media", AdminPostBlockMedia)
blocks.set("slider", AdminPostBlockSlider)

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

function create() {
  for (const block of createdBlocks.values()) {
    if (!block.ref) continue
    // console.log(block.ref.getData())
  }
}
</script>

<template>
  <div class="editor">
    <h1>Create post</h1>
    <button @click="create">test create</button>
    <AdminPostToolbar />

    <AdminPostBlockComponent
      v-for="postBlock in createdBlocks.entries()"
      :key="postBlock[0]"
      :component="postBlock[1].component"
      :data-id="postBlock[0]"
      @remove-block="removeBlock"
      @set-block-ref="setBlockRef"
    />
    <!-- <div>
      <component :is="" :ref="(el) => setBlockRef(el)" />
      <button @click="removeBlock(postBlock[0])">X</button>
    </div> -->
    <AdminPostBlocksMenu :list="blocksKeys" @select="selectBlock" />
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
