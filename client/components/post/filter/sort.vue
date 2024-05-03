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

function test() {
  articleParams.addQuery("sort")
}
</script>

<template>
  <URadioGroup
    v-model="articleParams.sort"
    legend="Choose sorting type"
    :options="options"
    @change="test"
  />
</template>

<style lang="scss" scoped></style>
