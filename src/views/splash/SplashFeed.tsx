import { Image, StyleSheet, Text, View } from 'react-native'
import { images } from 'views/theme'
import { LinearGradient } from '@tamagui/linear-gradient'

export const SplashFeed = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.9)']}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={styles.gradient}
        />
        <View style={styles.header}>
          <View style={styles.profile}>
            <Image source={images.eve} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Eve</Text>
              <Text style={styles.timestamp}>Just now</Text>
            </View>
          </View>
          <></>
          {/* <MoreHorizontal size={30} color="white" /> */}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 12,
  },
  innerContainer: {
    padding: 20,
    backgroundColor: '#474747',
    width: '100%',
    height: 220,
    borderRadius: 30,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9000,
    borderRadius: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 9999,
    width: '100%',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    marginLeft: 15,
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 8,
  },
  timestamp: {
    color: '#999',
    fontSize: 14,
    fontWeight: '400',
  },
})
