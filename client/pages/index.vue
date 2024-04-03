<script setup lang="ts">
interface IQ {
  id: number
  title: string
  body: string
  img: string
}

const test: IQ[] = [
  {
    id: 1,
    title: "test 1",
    body: "body 1",
    img: "/place.png",
  },
  {
    id: 2,
    title: "test 2",
    body: "body 2",
    img: "/place.png",
  },
  {
    id: 3,
    title: "test 3",
    body: "body 3",
    img: "/place.png",
  },
  {
    id: 4,
    title: "test 4",
    body: "body 4",
    img: "/place.png",
  },
  {
    id: 5,
    title: "test 5",
    body: "body 5",
    img: "/place.png",
  },
  {
    id: 6,
    title: "test 6",
    body: "body 6",
    img: "/place.png",
  },
  {
    id: 7,
    title: "test 7",
    body: "body 7",
    img: "/place.png",
  },
  {
    id: 8,
    title: "test 8",
    body: "body 8",
    img: "/place.png",
  },
]
const router = useRouter()
const route = useRoute()

const isLoad = ref(true)
const page = ref(1)
const currentPage = parseInt(route.query.page as any)

console.log(currentPage)

if (currentPage && currentPage > 1) page.value = currentPage

const items = ref(Array(55))

watch(page, () => {
  router.push({ query: { page: page.value } })
})

setTimeout(() => {
  isLoad.value = false
}, 5000)
</script>

<template>
  <div class="container my-6 flex justify-center items-center flex-col">
    <div
      v-for="(item, index) of test"
      v-if="isLoad"
      :key="index"
      class="flex mb-6 items-center space-x-4"
    >
      <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
      <div class="space-y-2">
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[200px]" />
      </div>
    </div>
    <div
      v-for="item of test"
      v-else
      :key="item.id"
      class="flex mb-6 items-center space-x-4 text-primary-500"
    >
      <img :src="item.img" alt="" class="h-12 w-12">
      <div class="space-y-2 text-center">
        <h1 class="h-4 w-[250px]">
          {{ item.title }}
        </h1>
        <p class="h-4 w-[250px]">
          {{ item.body }}
        </p>
      </div>
    </div>
    <p style="color: black">
      {{ page }}
    </p>
    <UPagination
      v-model="page"
      :page-count="5"
      :total="items.length"
      show-last
      show-first
    />
  </div>
</template>
