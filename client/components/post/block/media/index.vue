<script setup lang="ts">
export type FileData = IFile | File

export type MediaMap = Map<string, FileData>

const { isEdit, type, content } = withDefaults(
  defineProps<{
    isEdit?: boolean
    type: "file" | "slider"
    content?: IFile[]
  }>(),
  { isEdit: false, type: "file", content: () => [] },
)

defineExpose({
  getData,
})

const media = reactive<MediaMap>(new Map())
provide("media", media)

if (content && content.length > 0) {
  content.forEach((file) => {
    const key = randomId()

    media.set(key, file)
  })
}

function getData() {
  if (!media.size) return
  const filesList = [...media.values()]

  const pathList = filesList.reduce((list: string[], file: FileData) => {
    if ("fileName" in file) {
      list.push(file.id)
    }

    return list
  }, [])

  return pathList
}
</script>

<template>
  <PostBlockMediaUpload v-if="isEdit" :multiple="type === 'slider'" />
  <PostBlockMediaList />
</template>

<style lang="scss" scoped></style>
