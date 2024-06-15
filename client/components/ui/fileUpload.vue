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
      <UIcon
        name="i-heroicons-document-arrow-up-16-solid"
        :class="$style.icon"
      />
    </p>
    <p v-else :class="$style.uploadArea" @dragenter.prevent="dragStart">
      <label :for="inputId">
        <UIcon name="i-heroicons-photo-16-solid" :class="$style.icon" />
      </label>
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
  aspect-ratio: 1.5 / 1;
  width: 300px;
  height: auto;
  border-radius: 10px;
  overflow: hidden;
  background-color: #303031;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: #334e64;
  }
}

.icon {
  background-color: #418af4;
  font-size: 50px;
}

.dropArea {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
  background-color: #334e64;
}

.uploadArea {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  label {
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    display: none;
  }
}
</style>
