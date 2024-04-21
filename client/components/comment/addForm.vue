<script setup lang="ts">
const uploadImgPreviewURL = ref<string>()
const inputFile = ref<HTMLInputElement>()
const commentText = ref("")
const userStore = useUserStore()
const commentStore = useCommentStore()

function onFIleUpload(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files) return

  inputFile.value = e.target as HTMLInputElement

  const src = URL.createObjectURL(files[0])

  uploadImgPreviewURL.value = src
}

function resetUploadFile() {
  uploadImgPreviewURL.value = ""
  if (!inputFile.value) return
  inputFile.value.value = ""
}

function onSendMessage() {
  const commentBody = {
    id: new Date(),
    slug: commentText.value,
    name: userStore.data.name,
    created_at: new Date().toString(),
  }

  commentText.value = ""

  commentStore.add(commentBody)

  // console.log(commentBody)
}
</script>

<template>
  <form>
    <UTextarea
      v-model="commentText"
      color="primary"
      variant="outline"
      placeholder="Search..."
    />
    <div class="fileUpload">
      <label for="file"><UIcon name="i-heroicons-photo-16-solid" /></label>
      <input id="file" type="file" @change="onFIleUpload" />
      <div v-if="uploadImgPreviewURL" class="preview-container">
        <img :src="uploadImgPreviewURL" class="preview-img" />
        <button class="preview-btn" @click="resetUploadFile">✕</button>
      </div>
      <UButton v-if="commentText.length > 0" @click="onSendMessage">
        send
      </UButton>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.fileUpload {
  label {
    cursor: pointer;
    display: block;
    height: 50px;
    width: 50px;
    font-size: 60px;
  }

  input {
    display: none;
  }
}

.preview {
  &-container {
    width: 250px;
    height: auto;
    position: relative;
  }

  &-img {
    height: 100%;
    width: 100%;
  }

  &-btn {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
