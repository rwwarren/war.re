# Dependabot automation

This repo fully automates dependency updates end to end:

1. **PR opened** — Dependabot opens grouped PRs on a weekly schedule
   (`.github/dependabot.yml`). Minor and patch updates are grouped per app.
2. **Build tested** — `ci.yml` runs `format:check`, `lint`, `typecheck`, and
   `build` for each affected app.
3. **UI tested** — the same CI jobs build the static export and run Playwright
   smoke tests against it (`yarn e2e`) for both `main` and `subdomains/ryan`.
4. **Auto-merged** — `dependabot-auto-merge.yml` enables GitHub native
   auto-merge for **minor and patch** updates. GitHub squash-merges the PR
   automatically once all required checks pass. **Major** version bumps are
   left open for manual review.

## One-time repository setup

The auto-merge workflow enables GitHub's native auto-merge, which only takes
effect when these repo settings are in place. They are configured in the
GitHub UI / API, not in code, so they must be set once by a maintainer.

### 1. Allow auto-merge

`Settings > General > Pull Requests > Allow auto-merge` ✅

### 2. Protect `main` and require the CI check

`Settings > Branches > Add branch ruleset` (or classic branch protection) for
`main`:

- Require a pull request before merging
- **Require status checks to pass before merging**, and select **`CI Passed`**
  as the required check.

`CI Passed` is the aggregate gate in `ci.yml`; it always runs and only succeeds
when every build + UI test job that ran has passed (skipped jobs for untouched
apps are allowed). Requiring this single check is what holds the auto-merge
until the build and UI tests are green.

### CLI equivalents

```bash
# Allow auto-merge on the repo
gh api -X PATCH repos/rwwarren/war.re -f allow_auto_merge=true

# Require the CI Passed check on main (classic branch protection)
gh api -X PATCH repos/rwwarren/war.re/branches/main/protection \
  -F required_status_checks.strict=true \
  -F 'required_status_checks.checks[][context]=CI Passed' \
  -F enforce_admins=false \
  -F required_pull_request_reviews= \
  -F restrictions=
```

## PR preview screenshots

Every PR (including Dependabot) gets desktop + mobile screenshots of both apps'
`/n` page posted as an auto-updating inline comment. Two workflows implement
this. The commenting path depends on whether the PR's token can write:

- `pr-screenshots.yml` — runs on `pull_request`, builds both apps and captures
  screenshots via `scripts/screenshot.mjs`. For **same-repo PRs** (the owner's
  branches) the token is writable, so it publishes the inline comment directly
  via `scripts/post-screenshots.sh` — including on the PR that first adds this
  workflow. It also uploads the screenshots as an artifact.
- `pr-screenshots-comment.yml` — handles **Dependabot and fork PRs**, whose
  token in the workflow above is read-only. It runs on `workflow_run` from the
  default branch (trusted base context, write token, never checks out PR code),
  downloads the artifact, and posts the comment. Same-repo PRs are excluded so
  no comment is posted twice.

Both paths share `scripts/post-screenshots.sh`, which commits the images to the
orphan `pr-screenshots` branch and posts/updates a single sticky comment.

Notes:

- Inline images are served from `raw.githubusercontent.com`, which **requires
  the repo to be public**. For a private repo, read the screenshots from the
  `pr-screenshots` artifact on the "PR screenshots" run instead.
- The same-repo path also needs **Settings → Actions → General → Workflow
  permissions = Read and write** so the `GITHUB_TOKEN` can comment.
- Dependabot/fork screenshots only start appearing once this is merged to
  `main`, because `workflow_run` workflows execute from the default branch.
- The `pr-screenshots` branch is data only — exclude it from branch protection.

## Tuning the policy

- **Merge scope** — edit the `if:` condition in
  `dependabot-auto-merge.yml`. Add `version-update:semver-major` to also
  auto-merge majors, or drop `semver-minor` to auto-merge patches only.
- **Schedule / grouping** — edit `.github/dependabot.yml`.
