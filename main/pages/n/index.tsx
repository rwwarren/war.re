import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

// Person structured data so search engines can surface the profile details
// (name, role, employer, profiles) as a knowledge panel rather than guessing
// them from the page copy.
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ryan Warren',
  jobTitle: 'Software Engineer',
  url: 'https://war.re/n',
  image: 'https://war.re/og.png',
  worksFor: {
    '@type': 'Organization',
    name: 'Stripe',
    url: 'https://stripe.com/',
  },
  sameAs: [
    'https://github.com/rwwarren',
    'https://linkedin.com/in/ryanwwarren',
    'http://stackoverflow.com/users/1879792/ryan-warren',
    'https://wrixton.xyz/',
  ],
}

export default function Home() {
  return (
    <>
      <Head>
        <title>War.re - Ryan Warren</title>
        <meta
          name="description"
          content="Ryan Warren, a Seattle-based software engineer at Stripe. Projects, links, and resume."
        />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://war.re/n" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://war.re/n" />
        <meta property="og:title" content="Ryan Warren - Software Engineer" />
        <meta
          property="og:description"
          content="Ryan Warren, a Seattle-based software engineer at Stripe."
        />
        <meta property="og:image" content="https://war.re/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Ryan Warren, software engineer - war.re" />
        <meta property="og:site_name" content="War.re" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ryan Warren - Software Engineer" />
        <meta
          name="twitter:description"
          content="Ryan Warren, a Seattle-based software engineer at Stripe."
        />
        <meta name="twitter:image" content="https://war.re/og.png" />
        <meta name="twitter:image:alt" content="Ryan Warren, software engineer - war.re" />
        <meta name="author" content="Ryan Warren" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </Head>
      <ThemeToggle />
      <main className={styles.main}>
        <div className={styles.center}>
          <h1>Ryan Warren</h1>
          <div className={styles.subtitle}>
            <h2>Software Engineer</h2>
          </div>
          <div className={styles.info}>
            Hi! I am Seattle based Software Engineer currently working for{' '}
            <Link href="https://stripe.com/" target="_blank" rel="noopener noreferrer">
              Stripe
            </Link>
            .
          </div>
          <div className={styles.info}>
            I am currently working on random projects. Check out{' '}
            <Link href="https://wrixton.xyz/" target="_blank" rel="noopener noreferrer">
              wrixton.xyz
            </Link>{' '}
            to see the latest.
          </div>
          <div className={styles.info}>
            If you would like to learn a little more, see my{' '}
            <Link href="https://ryan.war.re/n" target="_blank" rel="noopener noreferrer">
              resume
            </Link>
            .
          </div>
          <div className={styles.images}>
            <Link href="https://github.com/rwwarren" target="_blank" rel="noopener noreferrer">
              <Image src="/github.svg" alt="Github link" width={30} height={30} />
            </Link>
            <Link
              href="https://linkedin.com/in/ryanwwarren"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/linkedin.svg" alt="Linkedin link" width={30} height={30} />
            </Link>
            <Link
              href="http://stackoverflow.com/users/1879792/ryan-warren"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/stackoverflow.svg" alt="Stack Overflow link" width={30} height={30} />
            </Link>
          </div>
        </div>
        <div className={styles.footer}>&copy; {new Date().getFullYear()} war.re</div>
      </main>
    </>
  )
}
