import { Stack } from 'expo-router'
import { View } from 'react-native'
import { palette } from 'views/theme'

export default function Page() {
  return (
    <View style={{ flex: 1, backgroundColor: palette.black }}>
      <Stack.Screen options={{ title: 'Contacts' }} />
    </View>
  )
}
