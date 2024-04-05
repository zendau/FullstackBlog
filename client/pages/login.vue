<script setup lang="ts">
import { object, string, type InferType } from "yup"
import type { FormSubmitEvent } from "#ui/types"

const state = reactive({
  email: "hello@nhatduyet.me",
  password: "NhatDuyet@JSON*2023#22",
  // password: "NhatDuyet@JSON*2023#",
})

const loadingIndicator = useLoadingIndicator()

const schema = object().shape({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
})

type Schema = InferType<typeof schema>

const isLoading = ref(false)
const data = ref()
const error = ref()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    isLoading.value = true
    loadingIndicator.start()
    const res = await $fetch<any>(
      "https://api.fakestorejson.com/api/v1/auth/login",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: event.data.email,
          password: event.data.password,
        }),
      },
    )
    data.value = res
  } catch (e: any) {
    if (e.status === 401) {
      error.value =
        "Пожалуйста, проверьте введенные данные и повторите попытку."
    } else {
      error.value =
        "Произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз позже."
    }

    setTimeout(() => (error.value = ""), 5000)
  } finally {
    loadingIndicator.finish()
    isLoading.value = false
  }
}
</script>
<template>
  <h1 v-if="isLoading">is loading...</h1>
  <p v-if="error" class="text-red-600">{{ error }}</p>
  <div class="w-4/5 mx-auto">
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 form p-7"
      @submit="onSubmit"
    >
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" color="white" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput
          v-model="state.password"
          type="password"
          class="input"
          placeholder="test"
        />
      </UFormGroup>

      <UButton type="submit"> Login </UButton>
    </UForm>
  </div>
</template>

<style scoped lang="scss">
.form {
  background-color: rgb(var(--color-gray-700));
}
</style>
