import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content="0; url=/n" />
        <title>War.re</title>
        <meta name="description" content="Ryan Warren's Website" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://war.re/n" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://war.re/n" />
        <meta property="og:title" content="Ryan Warren - Software Engineer" />
        <meta property="og:description" content="Seattle based SDE @ Stripe" />
        <meta property="og:image" content="https://war.re/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Ryan Warren, software engineer - war.re" />
        <meta property="og:site_name" content="War.re" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ryan Warren - Software Engineer" />
        <meta name="twitter:description" content="Seattle-based software engineer at Stripe" />
        <meta name="twitter:image" content="https://war.re/og.png" />
        <meta name="twitter:image:alt" content="Ryan Warren, software engineer - war.re" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <noscript>
        <Link href="/n">Click here to go to the main site</Link>
      </noscript>
    </>
  )
}
