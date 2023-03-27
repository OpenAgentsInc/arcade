import config from '../tamagui.config'
import { TamaguiProvider, TamaguiProviderProps, Theme } from '@my/ui'
import { useTheme } from '../lib/hooks'
import { AuthProvider } from './auth'
import { TRPCProvider } from './trpc' //mobile only

export function Provider({
  children,
  ...rest
}: Omit<TamaguiProviderProps, 'config'> & { pageProps?: any }) {
  const theme = useTheme()
  return (
    <AuthProvider>
      <TamaguiProvider
        config={config}
        disableInjectCSS
        defaultTheme="dark"
        {...rest}
      >
        <Theme name="dark">
          <Theme name={theme}>
            <TRPCProvider>{children}</TRPCProvider>
          </Theme>
        </Theme>
      </TamaguiProvider>
    </AuthProvider>
  )
}
