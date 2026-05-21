# JPportfolio — Task Completion

## When a coding task is done, run:
1. `pnpm lint` — Biome check for linting errors
2. `pnpm format` — Biome format write to fix formatting

## Verification
- No lint errors from `biome check .`
- Biome formatting applied (`biome format --write .`)
- TypeScript compiles without errors
- Dev server starts cleanly: `pnpm dev`
