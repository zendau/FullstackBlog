<script setup lang="ts">
const { post } = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const { addTag } = useArticleParamsStore()
</script>

<template>
  <div class="post__header">
    <div class="post__info">
      <NuxtLink :to="`/user/${post.author.id}`" class="text-base">
        {{ post.author.email }}
      </NuxtLink>
      <p class="text-sm">{{ dateFormat(post.createdDate) }}</p>
    </div>

    <h2 class="text-2xl">
      <NuxtLink :to="`/post/${post.id}`">
        {{ post.title }}
      </NuxtLink>
    </h2>
  </div>
  <div>
    <div v-if="post.tags?.length">
      <ul class="tags">
        <li v-for="tag in post.tags" :key="tag" @click="addTag(tag)">
          {{ tag }}
        </li>
      </ul>
      <hr />
    </div>

    <div class="post__header-content">
      <p><UIcon name="i-heroicons-clock" /> {{ post.timeRead }}</p>
      <p><UIcon name="i-heroicons-eye" /> {{ post.counterReads }}</p>
      <p>
        <UIcon name="i-heroicons-star" />
        {{ post.rating }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post {
  &__info {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
  }

  &__header {
    margin-top: 20px;
    &-content {
      display: flex;
      height: 100%;
      margin: 10px 0;
      p {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        margin-right: 20px;

        span {
          height: 20px;
          width: 20px;
          margin-right: 5px;
        }
      }
    }
  }
}

.tags {
  display: flex;
  padding: 8px;

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
</style>
