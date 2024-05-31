<script setup lang="ts">
const open = ref(false)
const { list } = defineProps({
  list: {
    type: Array<string>,
    required: true,
  },
})

const emit = defineEmits<{
  select: [block: string]
}>()

function selectBlock(block: string) {
  open.value = false
  emit("select", block)
}
</script>

<template>
  <UPopover v-model:open="open">
    <UButton color="white" trailing-icon="i-heroicons-plus-circle-16-solid" />

    <template #panel>
      <div class="p-4">
        <h2>Select item</h2>
        <hr />
        <p v-for="block in list" :key="block" @click="selectBlock(block)">
          {{ block }}
        </p>
      </div>
    </template>
  </UPopover>
</template>

<style lang="scss" scoped></style>
