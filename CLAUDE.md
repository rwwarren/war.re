# war.re

Multi-domain URL shortener and personal site. One independent Next.js app per domain.

## Stack

- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Package manager**: yarn
- **Lint**: ESLint (next/core-web-vitals)

## Commands

```bash
# run inside an app dir: main/ or subdomains/ryan/
yarn dev        # dev server at localhost:3000
yarn build      # static export to out/
yarn lint       # ESLint
yarn typecheck  # tsc --noEmit
yarn format     # Prettier --write (format:check to verify)
yarn test       # Jest — subdomains/ryan only
```

## Structure

- `main/` — Next.js app for war.re (pages router)
- `subdomains/ryan/` — Next.js app for the ryan.war.re resume
- `/` meta-refreshes to `/n` (the content route) — static export, no server rewrites

## Conventions

- Pages router (`pages/`), not app router
- Custom `_app.tsx` and `_document.tsx` wrappers
- Path alias `@/*` maps to project root
- React Strict Mode enabled
- Tests: `subdomains/ryan/` uses Jest + React Testing Library; `main/` has none

See `~/CLAUDE.md` for global conventions.
