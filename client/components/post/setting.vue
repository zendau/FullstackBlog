<script setup lang="ts">
const setting = useArticleSettingStore()
</script>

<template>
  <ClientOnly>
    <div class="w-24 mx-auto my-10">
      <UPopover>
        <UButton
          color="white"
          label="Open setting"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        />

        <template #panel>
          <div class="p-3">
            <URadioGroup
              v-model="setting.currentList"
              legend="Article list type"
              :options="setting.listTypes"
            />
            <hr class="my-2" />
            <URadioGroup
              v-model="setting.currentView"
              legend="Article view type"
              :options="setting.viewTypes"
            />
          </div>
        </template>
      </UPopover>
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped></style>
