// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@sidebase/nuxt-auth'],
  auth: {
    globalAppMiddleware: true,
  },
  colorMode: {
    preference: 'light',
  },
})