<script setup lang="ts">
import type { VueComponent } from "@/types"

const { component, dataId, content } = defineProps<{
  component: VueComponent
  dataId: string
  content?: BlockContent
}>()

const emit = defineEmits<{
  setBlockRef: [el: any, dataId: string]
  removeBlock: [dataId: string]
}>()
</script>

<template>
  <div>
    <component
      :is="component"
      :ref="(el) => emit('setBlockRef', el, dataId)"
      is-edit
      :content="content"
    />
    <button @click="() => emit('removeBlock', dataId)">X</button>
  </div>
</template>

<style lang="scss" scoped></style>
