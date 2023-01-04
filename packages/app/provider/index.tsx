import { useStore } from 'app/stores'
import { TamaguiProvider, TamaguiProviderProps, Theme } from '@my/ui'
import config from '../tamagui.config'
import { NavigationProvider } from './navigation'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const themeName = useStore((s) => s.themeName)
  return (
    <TamaguiProvider config={config} disableInjectCSS defaultTheme="dark" {...rest}>
      <Theme name="dark">
        <Theme name={themeName}>
          <NavigationProvider>{children}</NavigationProvider>
        </Theme>
      </Theme>
    </TamaguiProvider>
  )
}
