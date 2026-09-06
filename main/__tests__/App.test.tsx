import { render, screen } from '@testing-library/react'
import type { AppProps } from 'next/app'
import App from '../pages/_app'

// @vercel/analytics ships ESM-only, which this project's Jest config can't
// transform, and it injects a <script> unrelated to what _app itself is
// responsible for — mock it out so the test exercises _app's own JSX only.
jest.mock('@vercel/analytics/next', () => ({ Analytics: () => null }))

describe('_app', () => {
  it('renders the given page component with its pageProps', () => {
    function Page({ greeting }: { greeting: string }) {
      return <p>{greeting}</p>
    }
    render(
      <App Component={Page} pageProps={{ greeting: 'hello' }} router={{} as AppProps['router']} />
    )
    expect(screen.getByText('hello')).toBeInTheDocument()
  })
})
