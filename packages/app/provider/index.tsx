import { TamaguiProvider, TamaguiProviderProps, Theme } from '@my/ui'
import config from '../tamagui.config'
import { NavigationProvider } from './navigation'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  return (
    <TamaguiProvider config={config} disableInjectCSS defaultTheme="purple" {...rest}>
      <Theme name="purple">
        <NavigationProvider>{children}</NavigationProvider>
      </Theme>
    </TamaguiProvider>
  )
}
