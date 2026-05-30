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
      htmlAttrs: {
        lang: 'en',
        class: 'dark',
      },
      bodyAttrs: {
        class: '',
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'description',
          content:
            "John Paul Wile's portfolio — Full-stack developer & writer from Colorado Springs. Building things, breaking things, writing about AI tech. Check out my Substack newsletter and projects.",
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'keywords',
          content:
            'John Paul Wile, AI, developer, software engineer, Colorado Springs, newsletter, Substack, portfolio, projects, botsone, tech lead, full-stack',
        },
        { name: 'author', content: 'John Paul Wile' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'theme-color', content: '#09090b' },
        { name: 'color-scheme', content: 'dark' },
        { property: 'og:title', content: 'John Paul Wile — Developer & Writer' },
        {
          property: 'og:description',
          content: 'Full-stack developer from Colorado Springs. I break things quickly and write about AI tech.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.botsone.net' },
        { property: 'og:image', content: 'https://www.botsone.net/og.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'John Paul Wile — Developer & Writer' },
        { property: 'og:site_name', content: 'John Paul Wile' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@jpwile' },
        { name: 'twitter:creator', content: '@jpwile' },
        { name: 'twitter:title', content: 'John Paul Wile — Developer & Writer' },
        {
          name: 'twitter:description',
          content: 'Full-stack developer from Colorado Springs. I break things quickly and write about AI tech.',
        },
        { name: 'twitter:image', content: 'https://www.botsone.net/og.png' },
        { name: 'twitter:image:alt', content: 'John Paul Wile — Developer & Writer' },
        { name: 'msapplication-TileColor', content: '#f97316' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/jp.png' },
        { rel: 'canonical', href: 'https://www.botsone.net' },
        { rel: 'preconnect', href: 'https://www.botsone.net', crossorigin: '' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      contactEmail: 'botsone@gmail.com',
    },
  },
});
