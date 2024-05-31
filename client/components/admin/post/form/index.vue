<script setup lang="ts">
import { object, string, type InferType, mixed, array, number } from "yup"
import type { FormSubmitEvent } from "#ui/types"

const files = reactive([])
provide("files", files)

const tags = reactive<string[]>([])
provide("tags", tags)

const state = reactive({
  title: null,
  preview: null,
  file: files,
  timeRead: null,
  tags,
})

const type = "create"

function imageFilter() {
  let filter: any = mixed()
    .test(
      "notMultiply",
      "Для лого товара необходима только 1 фотограция",
      (value: any) => {
        if (value.length > 1) return false

        return true
      },
    )
    .test("fileFormat", "Недопустимый тип файла для лого", (value: any) => {
      if (value.length === 0) return true

      return (
        value && value[0] && ["image/jpeg", "image/png"].includes(value[0].type)
      )
    })
    .test(
      "fileSize",
      "Размер файла для лого превышает допустимый",
      (value: any) => {
        if (value.length === 0) return true
        return value && value[0] && value[0].size <= 5242880
      },
    )
  if (type === "edit") {
    filter = filter.notRequired()
  } else if (type === "create") {
    filter = filter.required("required")
  }

  return filter
}

const schema = object().shape({
  title: string().required("Required").min(6),
  preview: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
  file: imageFilter(),
  timeRead: number().required().min(1),
  tags: array(),
})

type Schema = InferType<typeof schema>

function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
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
      <UFormGroup label="Title" name="title">
        <UInput v-model="state.title" />
      </UFormGroup>

      <UFormGroup label="Time read" name="timeRead">
        <UInput v-model="state.timeRead" type="number" />
      </UFormGroup>

      <UFormGroup label="Preview" name="preview">
        <UTextarea v-model="state.preview" />
      </UFormGroup>

      <UFormGroup label="file" name="file">
        <AdminPostFormImage />
      </UFormGroup>

      <UFormGroup label="Tags" name="tags">
        <AdminPostFormTag />
      </UFormGroup>

      <UButton type="submit"> Submit </UButton>
    </UForm>
  </div>
</template>

<style scoped lang="scss"></style>
