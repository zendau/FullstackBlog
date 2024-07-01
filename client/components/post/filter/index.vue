<script setup lang="ts">
const articleParams = useArticleParamsStore()
</script>

<template>
  <PostFilterSearch />
  <PostFilterSort />
  <UButton
    color="red"
    class="col-start-3 row-start-3 w-fit px-6"
    @click="articleParams.defaultFilter"
  >
    Reset
  </UButton>
</template>

<style scoped lang="scss">
.filter {
  &-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    position: relative;
  }

  &__show {
    &--active {
      background-color: #c36839 !important;
      color: #fff !important;
    }
  }

  &__panel {
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &__body {
    background-color: var(--color-primary);
    position: relative;
    margin-top: 14px;
    box-shadow: 2px 2px 12px 4px rgb(0 0 0 / 5%);
    padding: 10px;

    display: none;
    flex-direction: column;
    align-items: center;

    transition: 0.5s ease;

    &:after {
      content: "";
      position: absolute;
      right: 5px;
      width: 0;
      height: 0;
      margin: 30px auto;
      border-left: 9px solid transparent;
      border-right: 9px solid transparent;
      border-bottom: 9px solid var(--color-primary);
      bottom: 88px;
    }

    &--active {
      display: flex;
    }
  }

  &__sort {
    margin: 10px 0;
    p {
      text-align: center;
    }
  }
}

@media (max-width: 720px) {
  .filter-container {
    margin-right: 10px;
  }

  .filter__show,
  .filter-container,
  .filter-container input,
  .filter-container select {
    font-size: 18px !important;
  }
}
</style>
