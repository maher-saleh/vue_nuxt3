// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  css: ['@/assets/css/main.css'],

  app: {
    head: {
      title: 'Nuxt 3 Store App',
      meta: [
        { name: 'description', content: 'Example of using Nust 3 framework for frontend developments'}
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'}
      ]
    },
  },
  runtimeConfig: {
    currency_api_key: process.env.CURRENCY_API_KEY
  },

  modules: ['@nuxt/fonts']
})