import { Slot, SplashScreen, Stack } from 'expo-router'
import { useCachedResources } from 'lib/hooks/useCachedResources'

export default function Layout() {
  const loaded = useCachedResources()

  if (!loaded) {
    return <SplashScreen />
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'Protomolecule',
            fontSize: 20,
            // textShadowColor: 'cyan',
            // textShadowRadius: 14,
          },
        }}
      >
        <Slot />
      </Stack>
    </>
  )
}
