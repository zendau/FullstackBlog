<script setup lang="ts">
import { object, string, type InferType, ref as yupRef } from "yup"
import type { FormSubmitEvent } from "#ui/types"

const emit = defineEmits<{
  onSumbit: []
}>()

const state = reactive({
  email: "",
  password: "",
  confirmPassword: "",
})

const schema = object().shape({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(6, "Must be at least 6 characters")
    .max(20, "Must be less than 20 characters")
    .required("Required"),
  confirmPassword: string()
    .required()
    .oneOf([yupRef("password"), ""], "Passwords must match"),
})

type Schema = InferType<typeof schema>

const authStore = useAuthStore()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const res = await authStore.register(event.data)

  if (!res) return
  emit("onSumbit")
}
</script>

<template>
  <UiLoader v-if="authStore.isLoading" />
  <UiErrorMessage :message="authStore.error" />

  <UForm :schema="schema" :state="state" class="mb-2" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput
        v-model="state.email"
        class="mt-2"
        color="white"
        placeholder="Email"
      />
    </UFormGroup>

    <UFormGroup label="Password" name="password" class="mt-7">
      <UInput
        v-model="state.password"
        type="password"
        class="mt-2"
        placeholder="Password"
      />
    </UFormGroup>

    <UFormGroup label="Confirm password" name="confirmPassword" class="mt-7">
      <UInput
        v-model="state.confirmPassword"
        type="password"
        class="mt-2"
        placeholder="Confirm password"
      />
    </UFormGroup>

    <UButton type="submit" class="block mx-auto mt-4 py-2 px-4">
      Register
    </UButton>
  </UForm>
</template>

<style lang="scss" scoped></style>
