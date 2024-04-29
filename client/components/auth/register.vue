<script setup lang="ts">
import { object, string, type InferType, ref as yupRef } from "yup"
import type { FormSubmitEvent } from "#ui/types"

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

function onSubmit(event: FormSubmitEvent<Schema>) {
  authStore.register(event.data)
}
</script>

<template>
  <h1 v-if="authStore.isLoading">is loading...</h1>
  <p v-if="authStore.error" class="text-red-600">{{ authStore.error }}</p>
  <div class="w-4/5 mx-auto">
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 form p-7"
      @submit="onSubmit"
    >
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" color="white" placeholder="Email" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput
          v-model="state.password"
          type="password"
          class="input"
          placeholder="Password"
        />
      </UFormGroup>

      <UFormGroup label="Confirm password" name="confirmPassword">
        <UInput
          v-model="state.confirmPassword"
          type="password"
          class="input"
          placeholder="Confirm password"
        />
      </UFormGroup>

      <UButton type="submit"> Register </UButton>
    </UForm>
  </div>
</template>

<style lang="scss" scoped></style>
