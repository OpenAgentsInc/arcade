import { StyleSheet, View } from 'react-native'

import { darkBlue } from '../constants'

export function Layout({ children }: { children: React.ReactNode }) {
  return <View style={styles.center}>{children}</View>
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 32,
  },
})
