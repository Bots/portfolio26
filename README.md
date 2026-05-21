# JPportfolio

Personal portfolio site for [John Paul Wile](https://www.botsone.net) — developer, writer, and AI enthusiast.

Built with **Nuxt 3**, **Tailwind CSS**, and **shadcn/vue**. Live at [botsone.net](https://www.botsone.net).

## What's Inside

- **Home** — Hero section, latest newsletter posts, featured projects
- **About** — Bio, skills, and connect links
- **Projects** — GitHub repos with language filtering and star counts
- **Newsletter** — Full archive of Substack posts
- **Contact** — Contact form with FormSubmit.co integration
- **404** — Custom error page

## Tech Stack

- [Nuxt 3](https://nuxt.com/) — Vue framework
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [shadcn/vue](https://www.shadcn-vue.com/) — UI components
- [Lucide](https://lucide.dev/) — Icons
- [VueUse](https://vueuse.org/) — Composables
- [FormSubmit.co](https://formsubmit.co/) — Contact form backend
- [Vercel](https://vercel.com/) — Deployment

## Setup

```bash
# Install dependencies
pnpm install

# Start dev server on http://localhost:3000
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
├── app.vue                 # Root layout (Navbar + main + Footer)
├── pages/                  # File-based routing
│   ├── index.vue           # Home page
│   ├── about.vue           # About me
│   ├── projects.vue        # GitHub projects
│   ├── contact.vue         # Contact form
│   ├── newsletter/
│   │   └── index.vue       # Newsletter archive
│   └── 404.vue             # Custom 404
├── components/             # Vue components
│   ├── Navbar.vue          # Fixed header with mobile menu
│   ├── Footer.vue          # Sticky footer with social links
│   └── ui/                 # shadcn/vue components
├── server/api/             # Server routes
│   ├── github.get.ts       # GitHub repos API
│   ├── substack.get.ts     # Substack feed API
│   └── contact.post.ts     # Contact form handler
├── lib/utils.ts            # cn() utility
├── nuxt.config.ts          # Nuxt configuration
└── vercel.json             # Vercel deployment config
```

## Deployment

Deployed to Vercel automatically on push to `main`.

## License

MIT
