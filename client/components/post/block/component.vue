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

<style lang="scss" scoped>
div {
  position: relative;
  margin-bottom: 10px;
  margin-left: 20px;
}

button {
  position: absolute;
  top: 0;
  left: -30px;
  font-size: 22px;
}
</style>
