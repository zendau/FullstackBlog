<script setup lang="ts">
const listTypes = [
  {
    value: "pagination",
    label: "Pagination",
  },
  {
    value: "infinity",
    label: "Infinity load",
  },
]

const viewTypes = [
  {
    value: "grid",
    label: "Grid with brief information",
  },
  {
    value: "singl",
    label: "A feed with extended information",
  },
]

const selected = ref("sms")
</script>

<template>
  <div class="w-24 mx-auto my-10">
    <UPopover>
      <UButton
        color="white"
        label="Open setting"
        trailing-icon="i-heroicons-chevron-down-20-solid"
      />

      <template #panel>
        <div class="p-3">
          <URadioGroup
            v-model="selected"
            legend="Article list type"
            :options="listTypes"
          />
          <hr class="my-2" />
          <URadioGroup
            v-model="selected"
            legend="Article view type"
            :options="viewTypes"
          />
        </div>
      </template>
    </UPopover>
  </div>
</template>

<style lang="scss" scoped></style>
