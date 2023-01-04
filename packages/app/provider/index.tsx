import { useTheme } from 'app/lib/useTheme'
import { useStore } from 'app/stores'
import { TamaguiProvider, TamaguiProviderProps, Theme } from '@my/ui'
import config from '../tamagui.config'
import { NavigationProvider } from './navigation'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const theme = useTheme()
  return (
    <TamaguiProvider config={config} disableInjectCSS defaultTheme="dark" {...rest}>
      <Theme name="dark">
        <Theme name={theme}>
          <NavigationProvider>{children}</NavigationProvider>
        </Theme>
      </Theme>
    </TamaguiProvider>
  )
}
