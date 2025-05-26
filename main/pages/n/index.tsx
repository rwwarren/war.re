import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>War.re</title>
        <meta name="description" content="Ryan Warren's Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
            <div className={styles.title}>
                <h1>Ryan Warren</h1>
            </div>
            <div className={styles.subtitle}>
                <h2>Software Engineer</h2>
            </div>
            <div className={styles.info}>
                Hi! I am Seattle based Software Engineer currently working for <Link href="https://stripe.com/" target="_blank">Stripe</Link>.
            </div>
            <div className={styles.info}>
                I am currently working on random projects. Click <Link href="https://wrixton.xyz/" target="_blank">here</Link> to check it out.
            </div>
            <div className={styles.info}>
                If you would like to learn a little more, see my <Link href="https://ryan.war.re/n" target="_blank">resume</Link>.
            </div>
            <div className={styles.images}>
                <Link href="https://github.com/rwwarren" target="_blank">
                    <Image
                        src="github.svg"
                        alt="Github link"
                        width={30}
                        height={30}
                    />
                </Link>
                <Link href="https://linkedin.com/in/ryanwwarren" target="_blank">
                    <Image
                        src="linkedin.svg"
                        alt="Linkedin link"
                        width={30}
                        height={30}
                    />
                </Link>
                <Link href="http://stackoverflow.com/users/1879792/ryan-warren" target="_blank">
                    <Image
                        src="stackoverflow.svg"
                        alt="Stack Overflow link"
                        width={30}
                        height={30}
                    />
                </Link>
            </div>
            <div className={styles.footer}>
                &copy; {new Date().getFullYear()} war.re
            </div>
        </div>

      </main>
    </>
  )
}
