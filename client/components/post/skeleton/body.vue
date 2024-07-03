<script setup lang="ts"></script>

<template>
  <div class="post">
    <div class="post__header">
      <div class="post__info">
        <USkeleton class="h-4 w-36 skeleton" />
        <USkeleton class="h-3 w-32 skeleton" />
      </div>
      <h2 class="post__title">
        <USkeleton class="h-5 w-52 my-2 skeleton" />
      </h2>
    </div>
    <div class="post__extended">
      <USkeleton class="h-7 w-full p-2 skeleton" />
      <hr class="my-2" />
      <USkeleton class="h-7 w-full skeleton" />
    </div>
    <div class="post__body">
      <USkeleton class="h-72 w-full skeleton" />
      <USkeleton class="h-10 mt-2 w-full skeleton" />
      <USkeleton class="h-72 mt-2 w-full skeleton" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.skeleton {
  background-color: var(--color-primary);
}

.post {
  display: grid;
  grid-template-rows: 70px 100px 1fr;
  margin-bottom: 25px;

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

  &__extended {
    padding: 5px;
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
