<script setup lang="ts">
const options = [
  {
    value: "byRating",
    label: "By rating",
  },
  {
    value: "byCreatedDate",
    label: "By createted date",
  },
]

const articleParams = useArticleParamsStore()

function onAddQuery() {
  articleParams.addQuery("sort")
}
</script>

<template>
  <URadioGroup
    v-model="articleParams.sort"
    legend="Sorting type"
    :options="options"
    class="row-start-2 row-end-4 self-start h-full mt-2"
    @change="onAddQuery"
  />
</template>

<style lang="scss" scoped></style>
