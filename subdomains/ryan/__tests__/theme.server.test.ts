/**
 * @jest-environment node
 */
import { getStoredTheme } from '../lib/theme'

// getStoredTheme's `typeof window === 'undefined'` guard only runs during
// actual server rendering — jsdom always defines `window`, so it needs a
// real "no window" environment to exercise.
describe('getStoredTheme on the server', () => {
  it('returns system without touching window', () => {
    expect(getStoredTheme()).toBe('system')
  })
})
