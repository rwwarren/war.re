# war.re — main site

Next.js app served at [war.re](https://war.re).

## Dev

```bash
yarn install
yarn dev      # localhost:3000
yarn lint
yarn typecheck
yarn build
```

## Notes

- Pages router (`pages/`)
- Static export (`output: 'export'` in `next.config.js`) — `yarn build` writes `out/`
- `/` is a static page that meta-refreshes to `/n`
- Path alias `@/*` → project root
