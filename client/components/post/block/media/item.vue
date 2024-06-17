<script setup lang="ts">
import type { FileData, IFile, MediaMap } from "./index.vue"

const { file, index: key } = defineProps<{
  file: FileData
  index: string
}>()

const emit = defineEmits<{
  removeImg: [key: string]
}>()

const url = import.meta.env.VITE_API

const media = inject<MediaMap>("media", new Map())

const isUploadFile = ref(false)
const controller = new AbortController()

onMounted(async () => {
  if ("id" in file) return
  const formData = new FormData()
  formData.append("files", file)

  try {
    isUploadFile.value = true
    const res = await useApiFetch<IFile>("/file/upload", {
      method: "post",
      body: formData,
      signal: controller.signal,
    })

    if (!media.has(key) || !res || !Array.isArray(res) || !res[0]) return

    media.set(key, res[0])
  } finally {
    isUploadFile.value = false
  }
})

function onRemoveImg() {
  if (isUploadFile.value) {
    controller.abort()
    isUploadFile.value = false
  }

  emit("removeImg", key)
}
</script>

<template>
  <div class="img__container">
    <template v-if="'id' in file">
      <PostBlockMediaView
        :src="`${url}/image/${file.fileName}`"
        :type="file.mimetype"
      />
    </template>
    <template v-else>
      <PostBlockMediaView :src="getMediaSrc(file)" :type="file.type" />
      <div class="img__overlay"></div>
      <span class="loader"></span>
    </template>

    <button @click="onRemoveImg">✕</button>
  </div>
</template>

<style lang="scss" scoped>
.img {
  &__container {
    position: relative;

    margin: 15px;
    margin-left: 0;

    img {
      aspect-ratio: 1.5 / 1;
      width: 300px;
      height: auto;
      border-radius: 10px;
    }

    p {
      text-align: center;
    }

    button {
      position: absolute;
      top: -8px;
      right: -8px;
      font-size: 25px;
      color: red;
      background-color: black;
      border-radius: 50%;
      padding: 5px;
      height: 35px;
      width: 35px;
      text-align: center;
      line-height: 25px;
    }
  }

  &__overlay {
    background-color: gray;
    opacity: 0.7;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  animation-fill-mode: both;
  animation: bblFadInOut 1.8s infinite ease-in-out;
}
.loader {
  color: #fff;
  font-size: 7px;
  position: absolute;
  text-indent: -9999em;
  animation-delay: -0.16s;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}

@keyframes bblFadInOut {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
