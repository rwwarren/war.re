// Captures desktop + mobile screenshots of the /n content route for one app.
//
// Run with the working directory set to the app dir (so @playwright/test and
// the `serve` binary resolve from that app's node_modules):
//
//   cd main && node ../scripts/screenshot.mjs "war.re" /abs/out/dir 4001
//
// The app must already be built (`yarn build`) so its static export exists in
// ./out, and the Chromium browser must be installed (`yarn playwright install`).
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { mkdir } from 'node:fs/promises'
import { setTimeout as sleep } from 'node:timers/promises'
import path from 'node:path'

const require = createRequire(path.join(process.cwd(), 'noop.js'))
const { chromium } = require('@playwright/test')

const [, , label, outDir, portArg] = process.argv
if (!label || !outDir) {
  console.error('usage: node screenshot.mjs <label> <out-dir> [port]')
  process.exit(1)
}
const port = Number(portArg ?? 4000)
const baseURL = `http://127.0.0.1:${port}`

const viewports = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 390, height: 844 },
]

const server = spawn(
  'npx',
  ['serve', 'out', '--no-clipboard', '--no-request-logging', '-l', String(port)],
  { stdio: 'ignore' }
)

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`${baseURL}/n`)
      if (res.ok) return
    } catch {
      // server not up yet
    }
    await sleep(500)
  }
  throw new Error('static server did not start in time')
}

try {
  await waitForServer()
  await mkdir(outDir, { recursive: true })
  const browser = await chromium.launch()
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    })
    const page = await context.newPage()
    await page.goto(`${baseURL}/n`, { waitUntil: 'networkidle' })
    await page.screenshot({
      path: path.join(outDir, `${label}-${vp.name}.png`),
      fullPage: true,
    })
    await context.close()
  }
  await browser.close()
} finally {
  server.kill()
}
