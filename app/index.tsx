import { Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>arcaDE</Text>
      <Stack.Screen options={{ title: 'Arcade' }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100vh',
    width: '100vw',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontFamily: 'Protomolecule',
    fontSize: 60,
    textShadowColor: 'cyan',
    textShadowRadius: 14,
  },
})
