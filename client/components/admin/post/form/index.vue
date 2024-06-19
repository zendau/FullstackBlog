<script setup lang="ts">
import { object, string, type InferType, mixed, array, number } from "yup"
import type { FormSubmitEvent } from "#ui/types"
const { articleData, type } = withDefaults(
  defineProps<{
    articleData?: IArticle | null
    type?: "create" | "edit"
  }>(),
  {
    type: "create",
    articleData: null,
  },
)

const articleStore = useArticleStore()
const router = useRouter()

const blockConstructor = ref()

const files = ref([])
provide("files", files)

const tags = reactive<string[]>(articleData?.tags ?? [])
provide("tags", tags)

const state = reactive({
  title: articleData?.title ?? "",
  preview: articleData?.preview ?? "",
  file: files,
  timeRead: articleData?.timeRead ?? "",
  tags,
})

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

export type ArticleSchema = InferType<typeof schema>
// function onSubmit(event: FormSubmitEvent<ArticleSchema>) {
//   if (!blockConstructor.value) return

//   const createdData: postData = {
//     ...event.data,
//     block: blockConstructor.value.getBlocksContent(),
//   }

//   console.log(createdData)
// }

function onSubmit(event: FormSubmitEvent<ArticleSchema>) {
  if (type === "create") onSubmitCreate(event)
  else if (type === "edit") onSubmitEdit(event)
  else console.error("unknown product type form")
}

async function onSubmitCreate(event: FormSubmitEvent<ArticleSchema>) {
  const articleId = await articleStore.add({
    ...event.data,
    blocks: blockConstructor.value.getBlocksContent(),
    ...(event.data.file.length === 1 && { file: event.data.file[0] }),
  })

  if (!articleId) return

  router.push(`/post/${articleId}`)
}

async function onSubmitEdit(event: FormSubmitEvent<ArticleSchema>) {
  console.log(event)
  // const { image, ...data } = event.data
  // const productId = await productStore.edit({
  //   id: productData?.id,
  //   ...data,
  //   ...(image.length === 1 && { image: image[0] }),
  //   blocks: blockConstructor.value.getBlocksContent(),
  // })
  // if (!productId) return
  // router.push(`/product/${productId}`)
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
        <AdminPostFormImage :image="articleData?.file.fileName" />
      </UFormGroup>

      <UFormGroup label="Tags" name="tags">
        <AdminPostFormTag />
      </UFormGroup>

      <ClientOnly>
        <AdminPostConstructor
          ref="blockConstructor"
          :init-blocks="articleData?.blocks"
        />
      </ClientOnly>

      <UButton type="submit"> Create </UButton>
    </UForm>
  </div>
</template>

<style scoped lang="scss"></style>
