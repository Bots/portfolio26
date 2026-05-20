// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-15',
  devtools: { enabled: false },

  css: ['~/assets/styles/app.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      title: 'John Paul Wile — I break things quickly and write about AI tech',
      meta: [
        {
          name: 'description',
          content:
            "John Paul Wile's portfolio — developer, writer, AI enthusiast. Check out my Substack newsletter and projects.",
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'keywords', content: 'John Paul Wile, AI, developer, newsletter, Substack, portfolio' },
        { property: 'og:title', content: 'John Paul Wile' },
        { property: 'og:description', content: 'I break things quickly and write about AI tech.' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@jpwile' },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/jp.png' }],
    },
  },
});
