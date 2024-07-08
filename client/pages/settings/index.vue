<script setup lang="ts">
definePageMeta({
  middleware: ["private", "activate"],
})

useHead({
  title: "Settings",
})
</script>

<template>
  <UiViewFormLayout>
    <h1>Settings</h1>
    <div class="link-container">
      <NuxtLink to="/settings/general"> General </NuxtLink>
    </div>
  </UiViewFormLayout>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 17px;
  font-weight: 500;
  position: relative;
  border-bottom: 1px solid #d5dddf;
  padding-bottom: 5px;
}

.link-container {
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  a {
    padding: 7px 0;
    transition: 0.5s ease;
    &:hover {
      color: var(--color-secondary-btn);
    }
  }
}
</style>
