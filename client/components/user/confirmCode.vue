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
  <h1 v-if="userStore.isLoading">is loading...</h1>
  <p v-if="userStore.error" class="text-red-600">{{ userStore.error }}</p>
  <div class="w-4/5 mx-auto">
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 form p-7"
      @submit="onSubmit"
    >
      <UFormGroup label="Confirm code" name="confirmCode">
        <UInput
          v-model="state.confirmCode"
          color="white"
          placeholder="Confirm code"
        />
      </UFormGroup>

      <UButton type="submit"> Send confirm code </UButton>
    </UForm>
    <UButton @click="resendConfirmCode">Resend confirm code</UButton>
    <UButton @click="$emit('onReset')">Reset</UButton>
  </div>
</template>

<style lang="scss" scoped></style>
