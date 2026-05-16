# war.re — main site

Next.js app served at [war.re](https://war.re).

## Dev

```bash
yarn install
yarn dev      # localhost:3000
yarn lint
yarn build
```

## Notes

- Pages router (`pages/`)
- `/` is rewritten to `/n` via `next.config.js`
- Path alias `@/*` → project root
