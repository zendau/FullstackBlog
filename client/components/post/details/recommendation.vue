<script setup lang="ts">
const isShowList = ref(false)

onMounted(() => {
  isShowList.value = true
})
</script>

<template>
  <hr />
  <PostInfinityList v-if="isShowList" />
</template>

<style lang="scss" scoped></style>
