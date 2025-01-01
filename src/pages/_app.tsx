// src/pages/_app.tsx

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout/Layout'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>dsa.gay</title> {/* Replace with your desired title */}
        <meta name="description" content="Learn Data Structures and Algorithms" />
        <link rel="icon" href="/favicon.png" /> {/* Ensure the path is correct */}
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}
