<script setup lang="ts">
import type { MediaMap } from "./index.vue"

const { multiple } = defineProps<{
  multiple: boolean
}>()

const media = inject<MediaMap>("media", new Map())
function removeFileList() {
  media.forEach((file) => {
    if (!("id" in file)) return

    useApiFetch(`/file/delete/${file.id}`, {
      method: "delete",
    })
  })
}

function onUploadFiles(files: FileList, multiple?: boolean) {
  if (!multiple) {
    removeFileList()
    media.clear()
  }

  Array.from(files).forEach((file) => {
    const id = randomId()

    media.set(id, file)
  })

  // const formData = new FormData()
  // Array.from(files).forEach((file) => formData.append("files", file))

  // const res = await useApiFetch<IFile[]>("/file/upload", {
  //   method: "post",
  //   body: formData,
  // })

  // if (!res || !Array.isArray(res)) return

  // if (!multiple) {
  //   removeFileList()
  //   media.length = 0
  // }

  // media.push(...res)
}

onUnmounted(() => {
  // removeFileList()
})
</script>

<template>
  <UiFileUpload :multiple="multiple" @upload="onUploadFiles" />
</template>

<style lang="scss" scoped></style>
