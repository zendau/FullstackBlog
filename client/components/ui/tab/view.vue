<script setup lang="ts">
const titles = reactive<string[]>([])

const slots: any = useSlots()
slots.default().forEach((el: { props: { title: string } }) => {
  titles.push(el.props.title)
})

const active = ref(titles[0])
provide("activeTab", active)
</script>

<template>
  <div
    v-for="title in titles"
    :key="title"
    :class="{ active: active === title }"
    @click="active = title"
  >
    {{ title }}
  </div>
  <slot />
</template>

<style lang="scss" scoped>
.active {
  color: red;
}
</style>
