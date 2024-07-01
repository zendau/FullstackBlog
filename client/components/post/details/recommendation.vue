<script setup lang="ts">
const isShowList = ref(false)

onMounted(() => {
  isShowList.value = true
})
</script>

<template>
  <div class="mt-10">
    <PostInfinityList v-if="isShowList" />
  </div>
</template>

<style lang="scss" scoped></style>
