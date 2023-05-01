import { Stack } from 'expo-router'
import { RelayManager } from 'views/relay/RelayManager'
import { Screen } from 'views/shared'

export default function Page() {
  return (
    <Screen>
      <RelayManager />
      <Stack.Screen options={{ title: 'Relays Manager' }} />
    </Screen>
  )
}
