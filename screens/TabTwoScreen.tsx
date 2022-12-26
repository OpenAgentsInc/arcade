import { StyleSheet } from 'react-native'
import { FeedTest } from '../components/FeedTest'
import { SignTest } from '../components/SignTest'
import { View } from '../components/Themed'

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <SignTest />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
