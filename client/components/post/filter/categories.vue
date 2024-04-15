<script setup lang="ts">
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

const selected = ref(null)
</script>

<template>
  <div v-if="error">
    <p>{{ error }}</p>
  </div>
  <div v-else>
    <UFormGroup label="Category">
      <!-- <USkeleton v-if="pending" class="h-6 w-full" /> -->
      <USelectMenu
        v-model="selected"
        :loading="pending"
        :options="categories"
        placeholder="Select category"
      />
    </UFormGroup>
  </div>
</template>

<style scoped></style>
