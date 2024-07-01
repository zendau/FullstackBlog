<script setup lang="ts">
import { object, string, type InferType } from "yup"
import type { FormSubmitEvent } from "#ui/types"

const state = reactive({
  email: "",
  password: "",
})

const schema = object().shape({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
})

type Schema = InferType<typeof schema>

const authStore = useAuthStore()

function onSubmit(event: FormSubmitEvent<Schema>) {
  authStore.login(event.data)
}
</script>

<template>
  <UiLoader v-if="authStore.isLoading" />
  <UiErrorMessage :message="authStore.error" />
  <UForm :schema="schema" :state="state" class="mb-2" @submit="onSubmit">
    <UFormGroup label="E-mail" name="email">
      <UInput
        v-model="state.email"
        color="white"
        class="mt-2"
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

    <UButton type="submit" class="block mx-auto mt-4 py-2 px-4">
      Login
    </UButton>
  </UForm>
  <NuxtLink to="/forgot" class="text-cyan-700 text-sm">
    Forgot your password?
  </NuxtLink>
</template>

<style lang="scss" scoped></style>
