import { useAuthed } from 'lib/hooks/useAuthed'
import { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TerminalText } from 'views/shared'
import { images } from 'views/theme'
import { animated, config, useSpring } from '@react-spring/web'
import { LinearGradient } from '@tamagui/linear-gradient'

export const SplashFeed = () => {
  const springStyles = useSpring({
    from: { opacity: 0, marginTop: 100 },
    to: { opacity: 1, marginTop: 0 },
    config: config.molasses,
  })

  const { login } = useAuthed()

  useEffect(() => {
    setTimeout(() => {
      login()
    }, 5000)
  }, [])

  return (
    <View style={styles.container}>
      <animated.View style={[styles.innerContainer, springStyles]}>
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
        </View>
        <TerminalText text="WELCOME PLAYER." style={styles.bodyText} />
        <TerminalText
          text="WHAT IS YOUR NAME?"
          initialDelay={2000}
          style={styles.bodyText}
        />
      </animated.View>
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
    zIndex: 0,
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
  bodyText: {
    fontFamily: 'Protomolecule',
    fontSize: 24,
    color: 'white',
    textShadowColor: 'cyan',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginTop: 20,
  },
})
