import config from '../tamagui.config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TamaguiProvider, TamaguiProviderProps, Theme } from '@my/ui'
import { useTheme } from '../lib/hooks'
import { AuthProvider } from './auth'

const queryClient = new QueryClient()

export function Provider({
  children,
  ...rest
}: Omit<TamaguiProviderProps, 'config'> & { pageProps?: any }) {
  const theme = useTheme()
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider
          config={config}
          disableInjectCSS
          defaultTheme="dark"
          {...rest}
        >
          <Theme name="dark">
            <Theme name={theme}>{children}</Theme>
          </Theme>
        </TamaguiProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}
