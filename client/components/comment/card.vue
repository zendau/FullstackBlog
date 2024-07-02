<script setup lang="ts">
interface IAuthor {
  email: string
  id: string
  isActivated: boolean
  isBlocked: boolean
}

const { author, date, message } = defineProps<{
  author: IAuthor
  date: string
  message: string
}>()
</script>

<template>
  <div class="comment__item">
    <div class="comment__header">
      <h3>
        <NuxtLink :to="`/user/${author.id}`">{{ author.email }}</NuxtLink>
      </h3>
      <p class="comment__created">{{ dateFormat(date) }}</p>

      <p class="isEdited">Edited</p>
      <div class="comment__toolbar">
        <button>
          <UIcon name="i-heroicons-pencil-square-16-solid" />
          <!-- <UIcon name="i-heroicons-document-check-16-solid" /> -->
        </button>
        <button><UIcon name="i-heroicons-trash" /></button>
      </div>
    </div>

    <p class="comment__body">{{ message }}</p>
  </div>
</template>

<style lang="scss" scoped>
.isEdited {
  font-size: 14px;
  color: rgb(58, 57, 57);
  grid-column: 2/3;
  grid-row: 1/2;
  justify-self: end;
}

.comment {
  &__item {
    margin-top: 10px;
    padding: 5px;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 300px;
  }

  &__created {
    grid-column: 1/2;
    font-size: 13px;
  }

  &__header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    padding: 4px;
    box-sizing: border-box;
    align-items: center;

    h3 {
      font-weight: bold;
    }
  }

  &__toolbar {
    display: flex;
    grid-column: 2/3;
    justify-self: end;
    align-items: center;

    button {
      font-size: 20px;
      border: none;
      cursor: pointer;
      margin: 0 3px;
      transition: 0.2s ease;
      background-color: inherit;

      &:hover {
        color: red;
      }
    }
  }

  &__body {
    white-space: pre;
    display: inline-block;
    width: 100%;
    padding: 5px;
  }

  &__form {
    display: inline-block;
    width: 100%;
    white-space: pre;
    height: 200px;
    max-height: 300px;
    overflow: auto;
    background-color: rgba(255, 255, 255, 0.514);
    border-radius: 6px;
    padding: 5px;
    border: 1px solid #bebebe;
  }

  &__btn {
    margin: 10px auto;
  }

  &__link {
    color: black;
    font-weight: bold;
  }

  &__title {
    margin-left: 5px;
  }
}
</style>
