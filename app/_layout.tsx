import { Slot, SplashScreen, Stack } from 'expo-router'
import { useCachedResources } from 'lib/hooks/useCachedResources'
import { View } from 'react-native'
import { Header } from 'views/web/Header'

export default function Layout() {
  const loaded = useCachedResources()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        height: '100%',
        width: '100%',
      }}
    >
      {loaded ? (
        <Stack screenOptions={{ headerShown: false }}>
          <Header />
          <Slot />
        </Stack>
      ) : (
        <SplashScreen />
      )}
    </View>
  )
}
