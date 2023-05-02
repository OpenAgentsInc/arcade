import { webln } from 'alby-js-sdk'
import { useSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

export default function Page() {
  const { address }: any = useSearchParams()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>zap {address}</Text>
      <Stack.Screen options={{ title: 'Send zap to ' + address }} />
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
