<script setup lang="ts">
const tags = inject<string[]>("tags", [])

function onInput(e: any) {
  const tag: string = e.target.value

  tags.push(tag)

  e.target.value = ""
}
</script>

<template>
  <input
    type="text"
    class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
    @keydown.prevent.enter="onInput"
  />
</template>

<style lang="scss" scoped></style>
