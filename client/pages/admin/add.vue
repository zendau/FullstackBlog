<script setup lang="ts">
import { object, string, type InferType, mixed, array } from "yup"
import type { FormSubmitEvent } from "#ui/types"

definePageMeta({
  layout: "admin",
  middleware: "protect-by-auth",
})

const state = reactive({
  email: null,
  password: null,
  file: null,
  category: [],
  type: null,
})

const schema = object().shape({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
  file: mixed()
    .required("required")
    .test("fileFormat", "Only PDF files are allowed", (value: any) => {
      const supportedFormats = ["pdf"]
      const e = value.split(".")

      if (!e) return false

      return supportedFormats.includes(e.at(-1))
    }),
  category: array().required().min(1, "select category"),
  type: string().required(),
})

type Schema = InferType<typeof schema>

const options = [
  {
    value: "email",
    label: "Email",
  },
  {
    value: "sms",
    label: "Phone (SMS)",
  },
  {
    value: "push",
    label: "Push notification",
  },
]

const { data: categories } = await useFetch(
  "https://api.fakestorejson.com/api/v1/public/product-categories",
  {
    transform: (value: any) => {
      if (!value || !value.data) return []
      return value.data.map((item: any) => item.name)
    },
  },
)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await console.log(event.data)
}
</script>

<template>
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

      <UFormGroup label="file" name="file">
        <UInput
          v-model="state.file"
          type="file"
          color="white"
          accept=".pdf,.doc,.docx"
        />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput
          v-model="state.password"
          type="password"
          class="input"
          placeholder="test"
        />
      </UFormGroup>

      <UFormGroup label="Category" name="category">
        <USelectMenu
          v-model="state.category"
          :options="categories"
          placeholder="Select categories"
          multiple
        />
      </UFormGroup>
      <UFormGroup label="Type" name="type">
        <URadioGroup
          v-model="state.type"
          legend="Choose type"
          :options="options"
        />
      </UFormGroup>

      <UButton type="submit"> Submit </UButton>
    </UForm>
  </div>
  <AdminPostEditor />
</template>

<style scoped lang="scss">
.form {
  background-color: rgb(var(--color-gray-700));
}
</style>
