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
  <div class="tab__container">
    <div
      v-for="title in titles"
      :key="title"
      class="tab__item"
      :class="{ 'tab__item--active': active === title }"
      @click="active = title"
    >
      {{ title }}
    </div>
  </div>
  <slot />
</template>

<style lang="scss" scoped>
.tab {
  &__container {
    display: flex;
    margin-bottom: 12px;
  }

  &__item {
    cursor: pointer;
    margin-right: 10px;

    &--active {
      position: relative;

      &::before {
        content: "";
        bottom: -2px;
        left: 0;
        width: 100%;
        display: block;
        position: absolute;
        height: 2px;
        background-color: var(--color-secondary-btn);
      }
    }
  }
}
</style>
