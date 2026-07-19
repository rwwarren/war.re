import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content="0; url=/n" />
        <title>Ryan Warren - Resume</title>
        <meta
          name="description"
          content="Ryan Warren's Resume - Senior Software Engineer at Stripe"
        />
        <meta name="robots" content="index, follow, noemailindex" />
        <meta name="googlebot" content="index, follow, noemailindex" />
        <link rel="canonical" href="https://ryan.war.re/n" />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://ryan.war.re/n" />
        <meta property="og:title" content="Ryan Warren Resume" />
        <meta property="og:description" content="Senior Software Engineer at Stripe" />
        <meta property="og:image" content="https://ryan.war.re/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="War.re" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Ryan Warren Resume" />
        <meta name="twitter:description" content="Senior Software Engineer at Stripe" />
        <meta name="author" content="Ryan Warren" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <noscript>
        <Link href="/n">Click here to go to the main site</Link>
      </noscript>
    </>
  )
}
