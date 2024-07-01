<script setup lang="ts">
import { object, string, type InferType } from "yup"
import type { FormSubmitEvent } from "#ui/types"

const emit = defineEmits<{
  onReset: [email: string]
}>()

const state = reactive({
  email: "",
})

const schema = object().shape({
  email: string().email("Invalid email").required("Required"),
})

type Schema = InferType<typeof schema>

const authStore = useAuthStore()

function onSubmit(event: FormSubmitEvent<Schema>) {
  // authStore.resetPassword(event.data)
  emit("onReset", event.data.email)
}
</script>

<template>
  <UiLoader v-if="authStore.isLoading" />
  <UiErrorMessage :message="authStore.error" />

  <UForm :schema="schema" :state="state" class="mb-2" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput
        v-model="state.email"
        color="white"
        placeholder="Email"
        class="mt-2"
      />
    </UFormGroup>

    <UButton type="submit" class="block mx-auto mt-4 py-2 px-4">
      Reset password
    </UButton>
  </UForm>
</template>

<style lang="scss" scoped></style>
