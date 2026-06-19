import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { DefaultSeo } from 'next-seo'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingChat from '@/components/layout/FloatingChat'
import PageIntro from '@/components/layout/PageIntro'
import 'swiper/css'
import '@/styles/globals.css'
import '@fontsource/pretendard/300.css'
import '@fontsource/pretendard/400.css'
import '@fontsource/pretendard/500.css'
import '@fontsource/pretendard/700.css'

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60 * 1000, retry: false },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <DefaultSeo
        defaultTitle="KORISPA | 고급 마사지 스파"
        titleTemplate="%s | KORISPA"
      />
      <PageIntro />
      <Header />
      <Component {...pageProps} />
      <Footer />
      <FloatingChat />
    </QueryClientProvider>
  )
}

export default appWithTranslation(App)
