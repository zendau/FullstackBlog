<script setup lang="ts">
const { multiple, accept } = withDefaults(
  defineProps<{
    multiple?: boolean
    accept?: string
  }>(),
  {
    multiple: false,
    accept: undefined,
  },
)

const emit = defineEmits<{
  upload: [files: FileList, multiple?: boolean]
}>()

const dragStatus = ref(false)

function dragStart() {
  dragStatus.value = true
}

function dragLeave() {
  dragStatus.value = false
}

const files = defineModel<File[]>({ default: [] })

function dataDrop(e: DragEvent) {
  dragStatus.value = false

  const uploadFiles = e.dataTransfer?.files
  applyFiles(uploadFiles)
}

function onFIleUpload(e: Event) {
  const uploadFiles = (e.target as HTMLInputElement).files
  applyFiles(uploadFiles)
}

function applyFiles(uploadFiles: FileList | undefined | null) {
  if (!uploadFiles) return

  if (!multiple) {
    files.value.length = 0
  }

  files.value.push(...uploadFiles)
  emit("upload", uploadFiles, multiple)
}

const inputId = useId()
</script>

<template>
  <div :class="$style.file" @dragover.prevent @drop.prevent>
    <p
      v-if="dragStatus"
      :class="$style.dropArea"
      @dragleave.prevent="dragLeave"
      @drop="dataDrop"
    >
      drop files
    </p>
    <p v-else :class="$style.uploadArea" @dragenter.prevent="dragStart">
      <label :for="inputId">upload files</label>
      <input
        :id="inputId"
        type="file"
        :accept="accept"
        :multiple="multiple"
        @change="onFIleUpload"
      />
    </p>
  </div>
</template>

<style module lans="scss">
.file {
  border: 1px solid black;
  height: 100px;
  width: 200px;
  overflow: hidden;
}

.dropArea {
  width: 100%;
  height: 100%;
  display: flex;
  border: 1px dashed black;
  align-items: center;
  justify-content: center;
  color: red;
  background-color: blue;
}

.uploadArea {
  width: 100%;
  height: 100%;
  display: flex;
  border: 1px dashed black;
  align-items: center;
  justify-content: center;

  label {
    cursor: pointer;
  }

  input {
    display: none;
  }
}
</style>
