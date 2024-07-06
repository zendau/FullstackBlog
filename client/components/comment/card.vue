<script setup lang="ts">
interface IAuthor {
  email: string
  id: string
  isActivated: boolean
  isBlocked: boolean
}

const { author, date, message, index, id, isEdited } = defineProps<{
  author: IAuthor
  date: string
  message: string
  index: number
  id: string
  isEdited: boolean
}>()

const isContentEditable = ref(false)
const commentEl = ref<any>()

const commentStore = useCommentStore()
const userStore = useUserStore()

const isCommentAuthor = computed(() => userStore.data?.id === author.id)

function cancelEditCommentMode() {
  isContentEditable.value = false
}

function onEditMessage() {
  const commentText = commentEl.value.innerHTML

  if (commentText !== message) {
    commentStore.edit({ message: commentText, commentId: id }, index)
  }

  cancelEditCommentMode()
}

function onDeleteComment() {
  commentStore.remove(id, index)
}
</script>

<template>
  <div class="comment__item">
    <div class="comment__header">
      <h3>
        <NuxtLink :to="`/user/${author.id}`">{{ author.email }}</NuxtLink>
      </h3>
      <p class="comment__created">{{ dateFormat(date) }}</p>

      <p v-if="isEdited" class="isEdited">Edited</p>
      <div v-if="isCommentAuthor" class="comment__toolbar">
        <button>
          <template v-if="isContentEditable">
            <UIcon
              name="i-heroicons-document-check-16-solid"
              class="text-lime-500"
              @click="onEditMessage"
            />
            <UIcon
              class="text-red-500"
              name="i-heroicons-no-symbol"
              @click="cancelEditCommentMode"
            />
          </template>

          <UIcon
            v-else
            class="text-orange-400"
            name="i-heroicons-pencil-square-16-solid"
            @click="isContentEditable = true"
          />
        </button>
        <UiModalConfirm
          message="Do you really want to delete this comment?"
          @confirm="onDeleteComment"
        >
          <button>
            <UIcon class="text-red-500" name="i-heroicons-trash" />
          </button>
        </UiModalConfirm>
      </div>
    </div>

    <p
      ref="commentEl"
      :contenteditable="isContentEditable"
      class="comment__body"
      :class="{ 'comment__body-edit': isContentEditable }"
    >
      {{ message }}
    </p>
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
    display: inline-block;
    width: 100%;
    padding: 5px;
    max-height: 300px;
    overflow-y: auto;
    overflow-x: none;
    white-space: pre-wrap;
    overflow-wrap: break-word;

    &-edit {
      border: 1px solid #bebebe;
      border-radius: 6px;
      background-color: var(--color-primary);
    }
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
