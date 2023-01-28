import { boundStore, store } from 'arca/store'
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'

export const monofont = Platform.OS === 'ios' ? 'Courier New' : 'monospace'

export const Hud = () => {
  const bears = boundStore((state) => state.bears)
  return (
    <View style={styles.container}>
      <View style={styles.hud}>
        <View style={styles.hudItem}>
          <Text style={styles.hudText}>{bears} sats</Text>
        </View>
      </View>
      <Pressable
        onPressIn={() => store.setState({ forward: true })}
        onPressOut={() => store.setState({ forward: false })}
        style={styles.bottomPressableArea}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9990,
  },
  bottomPressableArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    zIndex: 9998,
    opacity: 0,
    backgroundColor: 'black',
  },
  hud: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 20,
    paddingTop: 60,
  },
  hudItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 10,
  },
  hudText: {
    color: 'white',
    fontSize: 20,
    fontFamily: monofont,
  },
})
