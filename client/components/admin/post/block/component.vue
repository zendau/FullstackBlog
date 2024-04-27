<script setup lang="ts">
import type { VueComponent } from "@/types"

const { component, dataId } = defineProps<{
  component: VueComponent
  dataId: number
}>()

const emit = defineEmits<{
  setBlockRef: [el: any, dataId: number]
  removeBlock: [dataId: number]
}>()
</script>

<template>
  <div>
    <component :is="component" :ref="(el) => emit('setBlockRef', el, dataId)" />
    <button @click="() => emit('removeBlock', dataId)">X</button>
  </div>
</template>

<style lang="scss" scoped></style>
