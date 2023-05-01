import { Link, Stack } from 'expo-router'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

export default function Home() {
  return (
    <View style={styles.container}>
      <Link href="/">
        <Button title="Back" />
      </Link>
      <Text style={styles.title}>LOGIN</Text>
      <TextInput
        placeholder="Enter access key"
        style={{
          backgroundColor: '#444',
          padding: 12,
          marginTop: 15,
          borderRadius: 10,
        }}
        autoFocus
      />
      <Stack.Screen options={{ title: 'Arcade | Login' }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
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
