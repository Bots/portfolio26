# JPportfolio — Core

Personal portfolio site for John Paul Wile, built with Nuxt 3.

## Structure
- `pages/` — route pages: `index.vue`, `about.vue`, `projects.vue`, `contact.vue`, `404.vue`, `newsletter/index.vue`
- `components/` — app-level (`Navbar.vue`, `Footer.vue`) and shadcn-vue UI components under `components/ui/`
- `composables/` — reusable Vue composables
- `lib/utils.ts` — utility functions (cn helper for class merging)
- `server/api/` — server routes: `substack.get.ts`, `github.get.ts`, `contact.post.ts`
- `data/` — static data files
- `assets/styles/app.css` — global CSS with Tailwind directives
- `app.vue` — root layout with Navbar/Footer

## Project-wide invariants
- shadcn-vue components use new-york style with zinc base colors and lucide icons
- Tailwind CSS variables driven (cssVariables: true)
- Server API routes follow Nuxt 3 convention (`server/api/` auto-routes)
- TypeScript throughout, `lang="ts"` on Vue SFCs
- Single quotes, trailing commas, semicolons (Biome config)
- 120-char line width limit
