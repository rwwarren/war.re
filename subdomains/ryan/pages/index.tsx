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
        <title>War.re</title>
        <meta name="description" content="Ryan Warren's Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta property="og:url" content="ryan.war.re/n" />
        <meta property="og:title" content="Ryan Warren Resume" />
        <meta property="og:description" content="Currently: SDE @ Stripe" />
        <meta property="og:image" content="https://war.re/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <Link href="/n">Click here to go to the main site</Link>
      </main>
    </>
  )
}
