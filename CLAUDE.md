# war.re

Multi-domain URL shortener and personal site. Next.js app with subdomain routing.

## Stack

- **Framework**: Next.js 15 (React 19)
- **Language**: TypeScript
- **Package manager**: yarn
- **Lint**: ESLint (next/core-web-vitals)

## Commands

```bash
yarn dev      # Dev server at localhost:3000
yarn build    # Production build
yarn start    # Production server
yarn lint     # ESLint
```

## Structure

- `main/` — primary Next.js app (pages router)
- `subdomains/ryan/` — subdomain-specific content
- URL rewrite: `/` redirects to `/n` (main content route)
- API routes under `pages/api/`

## Conventions

- Pages router (`pages/`), not app router
- Custom `_app.tsx` and `_document.tsx` wrappers
- Path alias `@/*` maps to project root
- React Strict Mode enabled
- No test suite currently configured

See `~/CLAUDE.md` for global conventions.
