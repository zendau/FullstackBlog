<script setup lang="ts">
const value = ref("")

const router = useRouter()

async function onInpitTitle(title: string) {
  router.push({ query: { search: title } })

  const w = await useApiFetch(
    "https://api.fakestorejson.com/api/v1/public/products",
    {
      params: {
        keyword: title,
      },
    },
  )

  // const q = await $fetch(
  //   "https://api.fakestorejson.com/api/v1/public/products",
  //   {
  //     params: {
  //       keyword: title,
  //     },
  //   },
  // )

  console.log(w)
}

watch(value, useDebounceFn(onInpitTitle, 500))
</script>

<template>
  <div>
    <UFormGroup label="Title">
      <UInput v-model="value" placeholder="Search post..." />
    </UFormGroup>
  </div>
</template>

<style scoped></style>
