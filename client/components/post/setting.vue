<script setup lang="ts">
const setting = useArticleSettingStore()
</script>

<template>
  <div class="col-start-3 row-start-2">
    <UPopover>
      <UButton
        color="white"
        label="Setting"
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
</template>

<style lang="scss" scoped></style>
