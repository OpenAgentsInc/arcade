import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { animated, config, useSpring } from '@react-spring/native'

const AnimatedText = animated(Text)

export const TerminalText = ({ text, delay = 100 }) => {
  const [visibleText, setVisibleText] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setVisibleText((prevText) => {
        if (prevText.length < text.length) {
          return text.slice(0, prevText.length + 1)
        } else {
          clearInterval(typingInterval)
        }
      })
    }, delay)

    return () => clearInterval(typingInterval)
  }, [text, delay])

  useEffect(() => {
    const cursorBlinkInterval = setInterval(() => {
      setCursorVisible((prevVisible) => !prevVisible)
    }, 500)

    return () => clearInterval(cursorBlinkInterval)
  }, [])

  const cursorOpacity = useSpring({
    opacity: cursorVisible ? 1 : 0,
    config: config.default,
  })

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{visibleText}</Text>
      <AnimatedText style={[styles.cursor, cursorOpacity]}>|</AnimatedText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Protomolecule',
    fontSize: 24,
    color: 'cyan',
  },
  cursor: {
    fontFamily: 'Protomolecule',
    fontSize: 24,
    color: 'cyan',
  },
})
