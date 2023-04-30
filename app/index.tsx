import { Stack } from 'expo-router'
import { Text, View } from 'react-native'

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}
    >
      <Stack.Screen options={{ title: 'Arcade' }} />
      <Text
        style={{
          color: '#fff',
          fontFamily: 'Protomolecule',
          fontSize: 60,
          textShadowColor: 'cyan',
          textShadowRadius: 14,
        }}
      >
        arcaDE
      </Text>
    </View>
  )
}
