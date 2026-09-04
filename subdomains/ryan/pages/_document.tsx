import { Html, Head, Main, NextScript } from 'next/document'
import { themeInitScript } from '@/lib/theme'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
      </Head>
      <body>
        {/* Runs before hydration so the saved theme applies on first paint,
            with no flash of the wrong colors. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
