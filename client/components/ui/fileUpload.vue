<script setup lang="ts">
const dragStatus = ref(false)

function dragStart() {
  dragStatus.value = true
}

function dragLeave() {
  dragStatus.value = false
}

const files = inject<File[]>("files", [])
function dataDrop(e: DragEvent) {
  dragStatus.value = false

  const uploadFiles = e.dataTransfer?.files

  if (!uploadFiles) return

  files.push(...uploadFiles)
}

function onFIleUpload(e: Event) {
  const uploadFiles = (e.target as HTMLInputElement).files
  if (!uploadFiles) return

  files.push(...uploadFiles)
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
      <input :id="inputId" type="file" multiple @change="onFIleUpload" />
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
