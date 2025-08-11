// src/pages/_app.tsx

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout/Layout'
import Head from 'next/head'
import { ClerkProvider } from '@clerk/nextjs'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <Layout>
        <Head>
          <title>Learn Dsa Dev</title>
          <meta name="description" content="Learn Data Structures and Algorithms" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  )
}
