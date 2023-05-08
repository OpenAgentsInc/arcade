import 'lib/ignoreWarnings'
import { useCachedResources } from 'lib/hooks'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { BlankScreen } from 'views/dev'

export const App = () => {
  const loaded = useCachedResources()
  return (
    <>
      <StatusBar barStyle="light-content" />
      {loaded ? (
        <View style={styles.container}>
          <Text style={styles.title}>arcaDE</Text>
          <Text style={styles.subtitle}>CommErcE 2.0</Text>
        </View>
      ) : (
        <BlankScreen />
      )}
    </>
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
