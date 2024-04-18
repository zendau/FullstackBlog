<script setup lang="ts">
const articleParams = useArticleParamsStore()

const {
  data: categories,
  error,
  pending,
} = await useFetch(
  "https://api.fakestorejson.com/api/v1/public/product-categories",
  {
    transform: (value: any) => {
      if (!value || !value.data) return []
      return value.data.map((item: any) => item.name)
    },
  },
)

watch(
  () => articleParams.category,
  () => articleParams.addQuery("category"),
)
</script>

<template>
  <div v-if="error">
    <p>{{ error }}</p>
  </div>
  <div v-else>
    <UFormGroup label="Category">
      <!-- <USkeleton v-if="pending" class="h-6 w-full" /> -->
      <USelectMenu
        v-model="articleParams.category"
        :loading="pending"
        :options="categories"
        placeholder="Select category"
      />
    </UFormGroup>
  </div>
</template>

<style scoped></style>
