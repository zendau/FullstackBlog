<script setup lang="ts">
import type { Roles } from "../../../../stores/user"

const { role } = defineProps<{
  role: Roles
}>()
</script>

<template>
  <li>
    {{ role }}
  </li>
</template>

<style lang="scss" scoped></style>
