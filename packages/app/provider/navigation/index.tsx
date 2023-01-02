import * as Linking from 'expo-linking'
import { useMemo } from 'react'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  return (
    <NavigationContainer
      theme={{
        colors: {
          ...DarkTheme.colors,
          background: 'rgb(0, 2, 18)',
        },
        // dark: true,
      }}
      linking={useMemo(
        () => ({
          prefixes: [Linking.createURL('/')],
          config: {
            initialRouteName: 'home',
            screens: {
              home: '',
              'user-detail': 'user/:id',
              channels: 'channels',
            },
          },
        }),
        []
      )}
    >
      {children}
    </NavigationContainer>
  )
}
