<script setup lang="ts"></script>

<template>
  <div class="post">
    <div class="post__header">
      <div class="post__info">
        <USkeleton class="h-4 w-36" />
        <USkeleton class="h-3 w-32" />
      </div>

      <h2 class="post__title">
        <USkeleton class="h-5 w-52 my-2" />
      </h2>
    </div>
    <div class="post__body">
      <USkeleton class="h-52 w-full" />
      <USkeleton class="h-10 mt-2 w-full" />
    </div>
    <div class="post__footer">
      <USkeleton class="h-7 w-full p-2" />
      <hr class="my-2" />
      <USkeleton class="h-7 w-full" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post {
  box-shadow: 1px 1px 4px -1px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-rows: 70px 1fr 80px;
  margin-bottom: 25px;
  background-color: var(--color-primary);

  &__header {
    padding: 15px;
  }

  &__info {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: end;
  }

  &__body {
    padding: 10px;
  }

  &__footer {
    padding: 5px;
    background-color: var(--color-background-secondary);
    display: grid;
    grid-template-rows: 1fr 1fr;

    &:not(:has(.tags-container)) &-content {
      grid-row: 1/3;
    }
  }
}

@media (max-width: 720px) {
  .post {
    width: 100%;
    min-height: 200px;
    height: 100%;

    &__body {
      min-height: 75%;
    }
  }
}
</style>
