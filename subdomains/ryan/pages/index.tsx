import { useEffect } from 'react'

import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import { useRouter } from 'next/router'
import Link from "next/link";


export default function Home() {
    const router = useRouter()
    useEffect(() => {
        // Always do navigations after the first render
        router.push('/n', undefined, { shallow: true })
    }, [])
  return (
    <>
      <Head>
        <title>Ryan Warren - Resume</title>
        <meta name="description" content="Ryan Warren's Resume - Senior Software Engineer at Stripe" />
        <meta name="robots" content="index, follow, noemailindex" />
        <meta name="googlebot" content="index, follow, noemailindex" />
        <link rel="canonical" href="https://ryan.war.re/" />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://ryan.war.re/n" />
        <meta property="og:title" content="Ryan Warren Resume" />
        <meta property="og:description" content="Senior Software Engineer at Stripe" />
        <meta property="og:image" content="https://war.re/favicon.ico" />
        <meta property="og:site_name" content="War.re" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Ryan Warren Resume" />
        <meta name="twitter:description" content="Senior Software Engineer at Stripe" />
        <meta name="author" content="Ryan Warren" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <Link href="/n">Click here to go to the main site</Link>
      </main>
    </>
  )
}
