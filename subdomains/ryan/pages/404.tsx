import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 — Ryan Warren</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          <h1>404</h1>
          <div className={styles.info}>This page doesn&apos;t exist.</div>
          <div className={styles.info}>
            <Link href="/">Back to home</Link>
          </div>
        </div>
      </main>
    </>
  )
}
