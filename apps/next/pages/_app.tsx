import '@tamagui/core/reset.css'
import '@tamagui/font-inter/css/400.css'
import '@tamagui/font-inter/css/700.css'
import 'raf/polyfill'
import { Provider } from 'app/provider'
import { WebAuthProvider } from 'app/provider/webauth'
import Head from 'next/head'
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'

import type { SolitoAppProps } from 'solito'

function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>Arc</title>
        <meta name="description" content="One chat app to rule them all" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useRootTheme()

  return (
    <WebAuthProvider>
      <NextThemeProvider onChangeTheme={setTheme}>
        <Provider disableRootThemeClass defaultTheme={theme}>
          {children}
        </Provider>
      </NextThemeProvider>
    </WebAuthProvider>
  )
}

export default MyApp
