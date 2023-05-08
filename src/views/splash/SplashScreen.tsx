import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import {
    Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View
} from 'react-native'
import { TerminalText } from 'views/shared'
import { images } from 'views/theme'
import { useNavigation } from '@react-navigation/native'
import { animated, config, useSpring } from '@react-spring/native'
import { SplashFeed } from './SplashFeed'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headingContainer: {
    marginTop: 48,
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Protomolecule',
    fontSize: 86,
    lineHeight: 100,
    letterSpacing: 4,
    color: 'white',
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 72,
  },
  button: {
    width: '90%',
    borderRadius: 38,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 10,
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  buttonText: {
    fontFamily: 'Protomolecule',
    fontSize: 24,
    color: 'black',
  },
  loginButton: {
    backgroundColor: '#222',
    minWidth: '80%',
  },
  loginButtonText: {
    fontFamily: 'Protomolecule',
    fontSize: 18,
    color: '#7B7B7B',
  },
})

export const SplashScreen = () => {
  const { height, width } = useWindowDimensions()
  const navigation = useNavigation<any>()

  const [reverse, setReverse] = useState(false)
  const toggleReverse = () => setReverse(!reverse)

  const [showTransmission, setShowTransmission] = useState(false)
  const [showFeed, setShowFeed] = useState(false)

  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    reverse,
    config: reverse ? config.default : config.molasses,
    onRest: () => {
      if (reverse) {
        setShowTransmission(true)
      }
    },
  })

  const [transmissionSpring, api] = useSpring(() => ({
    opacity: 0,
  }))

  useEffect(() => {
    if (showTransmission) {
      api.start({ opacity: 1, delay: 0, config: config.gentle })
      const timer = setTimeout(() => {
        api.start({
          opacity: 0,
          config: config.stiff,
          onRest: () => setShowFeed(true),
        })
      }, 4000)

      return () => clearTimeout(timer) // Clean up the timeout when component is unmounted
    }
  }, [showTransmission, api])

  if (showFeed) {
    return <></>
    // return <SplashFeed />
  }

  if (showTransmission) {
    return (
      <View style={styles.container}>
        <animated.View style={transmissionSpring}>
          <TerminalText
            text="RECEIVING TRANSMISSION"
            style={{
              fontSize: 20,
              letterSpacing: 2,
              textShadowColor: '#00ffff',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 15,
            }}
          />
        </animated.View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <animated.View
        style={{
          ...spring,
          ...styles.imageContainer,
          width,
          height: width,
        }}
      >
        <LinearGradient
          colors={['transparent', 'transparent', '#000']}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9000,
          }}
        />
        <Image source={images.player1} style={styles.image} />
      </animated.View>
      <animated.View style={{ ...spring, ...styles.headingContainer }}>
        <Text style={styles.heading}>arcaDE</Text>
      </animated.View>
      <animated.View style={{ ...spring, ...styles.buttonContainer }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateAccountScreen')}
          style={{ ...styles.button, backgroundColor: '#00ffff' }}
        >
          <Text style={styles.buttonText}>EntEr</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}
          style={{ ...styles.button, ...styles.loginButton }}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </animated.View>
    </View>
  )
}
