// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@vueuse/nuxt",
    "@nuxtjs/eslint-module",
    "@nuxt/image",
    "@pinia/nuxt",
  ],
  devtools: { enabled: true },
  colorMode: {
    preference: "light",
  },
})
