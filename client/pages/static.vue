<template>
  <div>
    <p>{{ data.name }}</p>
    <p>{{ data.phone }}</p>
    <p>{{ data.email }}</p>
    <p>{{ data.address }}</p>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch(
  "https://api.fakestorejson.com/api/v1/public/orders/9638aee1f217b7e407fff540",
  {
    key: "static",
    transform: (data: any) => ({ ...data, fetchTime: new Date() }),
    getCachedData: (key, nuxt) => {
      const data = nuxt.payload.data[key] || nuxt.static.data[key]

      if (!data || !data.fetchTime) return

      const expDate = new Date(data.fetchTime)

      expDate.setTime(expDate.getTime() + 10 * 1000)

      const isExpired = expDate.getTime() < Date.now()

      if (isExpired) return

      return data
    },
  },
)
</script>

<style scoped></style>
