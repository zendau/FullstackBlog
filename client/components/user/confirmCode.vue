<script setup lang="ts">
import { object, string, type InferType } from "yup"
import type { FormSubmitEvent } from "#ui/types"

const { onSend, email } = defineProps<{
  email?: string
  onSend: (data: any) => void
}>()

defineEmits<{
  onReset: []
}>()

const state = reactive({
  confirmCode: "",
})

const schema = object().shape({
  confirmCode: string().required().min(6, "Must be at least 6 characters"),
})

type Schema = InferType<typeof schema>

const userStore = useUserStore()

function resendConfirmCode() {
  userStore.sendConfirmCode(email ?? userStore.data?.email)
}

function onSubmit(event: FormSubmitEvent<Schema>) {
  onSend(event.data.confirmCode)
}
</script>

<template>
  <UiLoader v-if="userStore.isLoading" />
  <UiErrorMessage :message="userStore.error" />

  <UForm :schema="schema" :state="state" class="mb-2" @submit="onSubmit">
    <UFormGroup label="Confirm code" name="confirmCode">
      <UInput
        v-model="state.confirmCode"
        color="white"
        placeholder="Confirm code"
      />
    </UFormGroup>

    <UButton type="submit" class="w-full mt-4 justify-center py-3">
      Send confirm code
    </UButton>
  </UForm>
  <div class="btn-container">
    <UButton color="amber" @click="resendConfirmCode">
      Resend confirm code
    </UButton>
    <UButton color="red" @click="$emit('onReset')"> Reset </UButton>
  </div>
</template>

<style lang="scss" scoped>
.btn-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;

  button {
    display: flex;
    justify-content: center;
  }
}
</style>
