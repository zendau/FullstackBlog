<script setup lang="ts">
const { y } = useWindowScroll({ behavior: "smooth" })
const isShow = ref(false)

function onClickHandler() {
  y.value = 0
}

watch(
  y,
  useDebounceFn((value) => {
    if (value > 400) {
      isShow.value = true
    } else {
      isShow.value = false
    }
  }, 50),
)
</script>

<template>
  <button v-if="isShow" @click="onClickHandler">↑</button>
</template>

<style lang="scss" scoped>
button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 24px;
  line-height: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
}
</style>
