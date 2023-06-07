import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Providers from './providers'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Sidebar } from '@/components/sidebar'
import Navbar from '@/components/navbar'

import { Mulish } from 'next/font/google'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loading from '@/components/loading'
import { ModalContextProvider } from '@/contexts/modal.context'
import { ToastContainer } from '@/components/toast'

const mulish = Mulish({ subsets: ['latin'] })


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleStop = () => setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <Providers >
      <ModalContextProvider>
        <main className={mulish.className}>
          <Navbar />
          <Sidebar />
          <Component {...pageProps} />
          {
            loading ? <Loading /> : ""
          }
        </main>
      </ModalContextProvider>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </Providers>
  )
}
