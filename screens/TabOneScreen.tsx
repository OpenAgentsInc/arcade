import { StyleSheet } from 'react-native'

import EditScreenInfo from '../components/EditScreenInfo'
import { NostrTest } from '../components/NostrTest'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <NostrTest />
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
