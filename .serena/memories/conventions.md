# JPportfolio — Conventions

## Code style (Biome)
- Single quotes for strings
- Trailing commas in objects/arrays
- Semicolons always
- 2-space indentation
- 120-character max line width
- `noUnusedVariables` turned off, `noUnusedImports` turned on
- `noExplicitAny` is warn (not error)

## Naming
- Vue components: PascalCase (`Navbar.vue`, `Card.vue`)
- composable functions: camelCase with `use` prefix convention
- TypeScript files: camelCase or PascalCase depending on export
- Server API routes: kebab-case with method suffix (`substack.get.ts`, `contact.post.ts`)

## Project structure
- `components/ui/` — shadcn-vue generated UI components (do not edit manually; regenerate via shadcn CLI)
- `lib/utils.ts` — shared utilities (cn helper for tailwind-merge)
- `composables/` — custom Vue composables
- `pages/` — Nuxt file-based routing, each `.vue` is a route
- `server/api/` — Nitro server routes, auto-exposed

## Vue/SFC conventions
- `<script setup lang="ts">` syntax
- Tailwind utility classes directly in templates
- CSS variables for theming (zinc palette)
- Primary color: `#f97316` (orange)
