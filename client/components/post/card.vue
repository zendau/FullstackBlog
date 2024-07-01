<script setup lang="ts">
const { post } = defineProps<{
  post: IArticle
}>()

const { addTag } = useArticleParamsStore()
</script>

<template>
  <div class="post">
    <div class="post__header">
      <div class="post__info">
        <p>{{ post.author.email }}</p>
        <p>{{ dateFormat(post.createdDate) }}</p>
      </div>

      <h2 class="post__title">
        <NuxtLink :to="`/post/${post.id}`">
          {{ post.title }}
        </NuxtLink>
      </h2>
    </div>
    <div class="post__body">
      <NuxtImg loading="lazy" :src="getApiFile(post.file.fileName)" alt="" />
      <p>
        {{ post.preview }}
      </p>
    </div>
    <div class="post__footer">
      <div v-if="post.tags?.length" class="tags-container">
        <ul class="tags">
          <li v-for="tag in post.tags" :key="tag" @click="addTag(tag)">
            {{ tag }}
          </li>
        </ul>
        <hr />
      </div>

      <div class="post__footer-content">
        <p>
          <UIcon name="i-heroicons-star" />
          {{ post.rating }}
        </p>
        <p><UIcon name="i-heroicons-clock" /> {{ post.timeRead }}</p>
        <p><UIcon name="i-heroicons-eye" /> {{ post.counterReads }}</p>
        <p><UIcon name="i-iconamoon-comment" /> {{ post.counterComments }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tags {
  display: flex;
  padding: 8px;
  flex-wrap: wrap;

  li {
    font-size: 14px;
    margin-right: 8px;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      color: var(--color-secondary-btn);
    }
  }
}

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
  }

  &__body {
    padding: 10px;

    img {
      margin: 0 auto;
    }

    p {
      margin-top: 5px;
    }
  }

  &__footer {
    padding: 5px;
    background-color: var(--color-background-secondary);
    display: grid;
    grid-template-rows: 1fr 1fr;

    &:not(:has(.tags-container)) &-content {
      grid-row: 1/3;
    }

    &-content {
      display: flex;
      justify-content: space-evenly;
      height: 100%;
      p {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;

        span {
          height: 20px;
          width: 20px;
          margin-right: 5px;
        }
      }
    }
  }

  &__title {
    font-size: 20px;
    padding: 5px;
  }
}

@media (max-width: 720px) {
  .post {
    width: 100%;
    min-height: 200px;
    height: 100%;

    &__title {
      font-size: 26px;
    }

    &__body {
      font-size: 18px;
      min-height: 75%;
    }
  }
}
</style>
