#!/usr/bin/env bash
# Publishes captured screenshots to the orphan `pr-screenshots` branch and posts
# (or updates) a sticky inline comment on the PR.
#
# Required env:
#   REPO     - owner/repo (e.g. rwwarren/war.re)
#   PR       - pull request number
#   SHA      - head commit SHA of the PR
#   GH_TOKEN - token with contents:write + pull-requests:write
# Expects PNGs in ./screenshots named <label>-<viewport>.png.
set -euo pipefail

SHORT=${SHA:0:7}

git config --global user.name 'github-actions[bot]'
git config --global user.email '41898282+github-actions[bot]@users.noreply.github.com'
REMOTE="https://x-access-token:${GH_TOKEN}@github.com/${REPO}.git"

# Publish the images to the orphan pr-screenshots branch under pr-<num>/<sha>/.
if git clone --depth 1 --branch pr-screenshots "$REMOTE" branch 2>/dev/null; then
  cd branch
else
  mkdir branch && cd branch
  git init -q
  git remote add origin "$REMOTE"
  git checkout -q --orphan pr-screenshots
fi
rm -rf "pr-${PR}"
mkdir -p "pr-${PR}/${SHORT}"
cp ../screenshots/*.png "pr-${PR}/${SHORT}/"
git add -A
git commit -q -m "screenshots: PR #${PR} @ ${SHORT}"
git push -q origin pr-screenshots
cd ..

# Build the comment body with inline images (raw.githubusercontent.com requires
# the repo to be public).
RAW="https://raw.githubusercontent.com/${REPO}/pr-screenshots/pr-${PR}/${SHORT}"
{
  echo '<!-- pr-screenshots-bot -->'
  echo '## 📸 Preview screenshots'
  echo ''
  echo "_Captured from the static build of commit \`${SHORT}\`._"
  echo ''
  echo '### war.re'
  echo '| Desktop | Mobile |'
  echo '| :---: | :---: |'
  echo "| <img src=\"${RAW}/war.re-desktop.png\" width=\"420\"> | <img src=\"${RAW}/war.re-mobile.png\" width=\"200\"> |"
  echo ''
  echo '### ryan.war.re'
  echo '| Desktop | Mobile |'
  echo '| :---: | :---: |'
  echo "| <img src=\"${RAW}/ryan.war.re-desktop.png\" width=\"420\"> | <img src=\"${RAW}/ryan.war.re-mobile.png\" width=\"200\"> |"
} > body.md

# Post a new sticky comment or update the existing one.
jq -n --arg body "$(cat body.md)" '{body: $body}' > payload.json
existing=$(gh api "repos/${REPO}/issues/${PR}/comments" --paginate \
  --jq '[.[] | select(.body | startswith("<!-- pr-screenshots-bot -->"))][0].id')
if [ -n "$existing" ] && [ "$existing" != "null" ]; then
  gh api -X PATCH "repos/${REPO}/issues/comments/${existing}" --input payload.json
else
  gh api -X POST "repos/${REPO}/issues/${PR}/comments" --input payload.json
fi
