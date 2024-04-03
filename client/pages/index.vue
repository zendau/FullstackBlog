<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const page = ref(1)
const { x, y } = useWindowScroll({ behavior: "smooth" })

const currentPage = parseInt(route.query.page as any)

if (currentPage && currentPage > 1) page.value = currentPage

const POST_ON_PAGE = 10

const { data: posts, pending } = await useFetch(
  "https://api.fakestorejson.com/api/v1/public/products",
  {
    query: {
      per_page: POST_ON_PAGE,
      page,
    },
    transform: (posts: any) => {
      return posts.data.map((post: any) => ({
        id: post.id,
        name: post.name,
        desc: post.description,
      }))
    },
    lazy: true,
    key: `post-page/${page.value}`,
  },
)

const postMaxitemsCount = 55

watch(page, () => {
  router.push({ query: { page: page.value } })
  x.value = 0
  y.value = 0
})
</script>

<template>
  <h1 class="text-center text-4xl m-4">Catalog</h1>
  <div v-if="pending" class="cart__container">
    <div v-for="item of POST_ON_PAGE" :key="item" class="cart__item">
      <USkeleton class="h-60 w-full" />
      <div class="mt-3 space-y-2 text-center">
        <USkeleton class="h-6 w-full" />
        <USkeleton class="h-40 w-full" />
      </div>
    </div>
  </div>
  <div v-else class="cart__container">
    <div v-for="post of posts" :key="post.id" class="cart__item">
      <NuxtImg src="/item.jpg" class="cart__item--img" alt="" />
      <div class="mt-3 space-y-2 text-center">
        <h1 class="">
          <NuxtLink :to="`/${post.id}`">
            {{ post.name }}
          </NuxtLink>
        </h1>
        <p class="">
          {{ post.desc }}
        </p>
      </div>
    </div>
  </div>
  <div class="flex justify-center m-10">
    <UPagination
      v-model="page"
      :page-count="10"
      :total="postMaxitemsCount"
      show-last
      show-first
    />
  </div>
</template>

<style lang="scss">
.cart {
  background-color: red;
  &__container {
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 15px;
  }

  &__item {
    display: flex;
    flex-direction: column;

    &--img {
      height: auto;
      widows: 100%;
    }
  }
}
</style>
