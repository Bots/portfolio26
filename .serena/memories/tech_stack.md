# JPportfolio — Tech Stack

## Core
- **Framework**: Nuxt 3 (^3.15.4) with Vue 3 (^3.5.0) and Vue Router (^4.5.0)
- **Language**: TypeScript (tsconfig.json, `lang="ts"` on Vue SFCs)
- **Package manager**: pnpm (pnpm-workspace.yaml, pnpm-lock.yaml)

## Styling
- **Tailwind CSS** (^3.4.19) with @nuxtjs/tailwindcss module
- **PostCSS** (8.5.14) with autoprefixer
- **shadcn-vue** components (new-york style, zinc base, lucide icons)
- **class-variance-authority** + **tailwind-merge** for variant/merge patterns

## Tooling
- **Biome** (^2.2.0) for linting and formatting
- **Vercel** deployment (vercel.json)
- **@vueuse/core** (^14.3.0) for Vue composables
- **axios** (^1.12.0) for HTTP requests
- **@lucide/lab** (^0.1.0) for icons
- **reka-ui** (^2.9.7) as shadcn-vue headless primitives
- **rss-parser** (^3.13.0) for Substack feed parsing

## Config
- `nuxt.config.ts` — Nuxt config with Tailwind, CSS, runtime config
- `tailwind.config.js` — custom zinc color palette, orange primary (#f97316)
- `biome.json` — formatter (2-space, 120 chars, single quotes, trailing commas)
- `components.json` — shadcn-vue schema
