import { Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>arcaDE</Text>
      <Text style={styles.subtitle}>LAUNCHING MAY 2023</Text>
      <Stack.Screen options={{ title: 'Arcade' }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
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
  subtitle: {
    color: '#fff',
    fontFamily: 'Protomolecule',
    fontSize: 20,
    textShadowColor: 'cyan',
    textShadowRadius: 14,
    marginTop: 20,
  },
})
