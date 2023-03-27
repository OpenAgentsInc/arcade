import config from '../tamagui.config'
import { TamaguiProvider, TamaguiProviderProps, Theme } from '@my/ui'
import { useTheme } from '../lib/hooks'
import { AuthProvider } from './auth'

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
          <Theme name={theme}>{children}</Theme>
        </Theme>
      </TamaguiProvider>
    </AuthProvider>
  )
}
