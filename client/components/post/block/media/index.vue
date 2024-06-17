<script setup lang="ts">
export interface IFile {
  authorId: string
  fileName: string
  id: string
  mimetype: string
}

export type FileData = IFile | File

export type MediaMap = Map<string, FileData>

const { isEdit, type } = withDefaults(
  defineProps<{
    isEdit?: boolean
    type: "file" | "slider"
    content?: string
  }>(),
  { isEdit: false, type: "file", content: "" },
)

defineExpose({
  getData,
})

const media = reactive<MediaMap>(new Map())
provide("media", media)

// const initBlockData = parseInitData()

// function parseInitData(): string[] {
//   try {
//     if (!content) return []

//     const initContentkData: string[] = JSON.parse(content)

//     if (!Array.isArray(initContentkData)) throw Error

//     return initContentkData
//   } catch {
//     return []
//   }
// }

function getData() {
  if (!media.size) return
  const filesList = [...media.values()]

  const pathList = filesList.reduce((list: string[], file: FileData) => {
    if ("fileName" in file) {
      list.push(file.fileName)
    }

    return list
  }, [])

  return JSON.stringify(pathList)
}
</script>

<template>
  <PostBlockMediaUpload v-if="isEdit" :multiple="type === 'slider'" />
  <PostBlockMediaList />
</template>

<style lang="scss" scoped></style>
