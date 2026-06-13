# ryan.war.re — resume

Next.js app served at [ryan.war.re](https://ryan.war.re).

## Dev

```bash
yarn install
yarn dev      # localhost:3000
yarn lint
yarn typecheck
yarn test
yarn build
```

## Notes

- Pages router (`pages/`)
- Static export (`output: 'export'` in `next.config.js`) — `yarn build` writes `out/`
- `/` is a static page that meta-refreshes to `/n`
- Path alias `@/*` → project root
- Jest + Testing Library for component tests
