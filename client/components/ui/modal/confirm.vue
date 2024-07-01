<script setup lang="ts">
const isOpen = ref(false)

const { message, buttonText } = defineProps<{
  buttonText: string
  message: string
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

function onConfirm() {
  isOpen.value = false
  emit("confirm")
}

function onCancel() {
  isOpen.value = false
  emit("cancel")
}
</script>

<template>
  <div>
    <UButton :label="buttonText" @click="isOpen = true" />

    <UModal v-model="isOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <h1 class="text-center">{{ message }}</h1>
        </template>

        <div class="flex justify-evenly">
          <UButton class="py-2 w-20 flex justify-center" @click="onConfirm">
            Confirm
          </UButton>
          <UButton class="py-2 w-20 flex justify-center" @click="onCancel">
            Cancel
          </UButton>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
