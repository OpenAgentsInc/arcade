import { useTheme } from 'app/lib/useTheme'
import { useEffect } from 'react'
import { Alert } from 'react-native'
import { TamaguiProvider, TamaguiProviderProps, Theme } from '@my/ui'
import config from '../tamagui.config'
import { NavigationProvider } from './navigation'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const theme = useTheme()
  useEffect(() => {
    Alert.alert('Here in the provider')
  }, [theme])
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
