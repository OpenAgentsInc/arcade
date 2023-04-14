import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { animated, config, useSpring } from '@react-spring/native'

const AnimatedText = animated(Text)

export const TerminalText = ({ text, delay = 100 }) => {
  const [visibleText, setVisibleText] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const [delayElapsed, setDelayElapsed] = useState(false)

  useEffect(() => {
    const cursorBlinkInterval = setInterval(() => {
      setCursorVisible((prevVisible) => !prevVisible)
    }, 500)

    setTimeout(() => {
      setDelayElapsed(true)
    }, 2000)

    return () => {
      clearInterval(cursorBlinkInterval)
    }
  }, [])

  useEffect(() => {
    if (delayElapsed) {
      const typingInterval = setInterval(() => {
        setVisibleText((prevText) => {
          if (prevText.length < text.length) {
            return text.slice(0, prevText.length + 1)
          } else {
            clearInterval(typingInterval)
          }
        })
      }, delay)

      return () => {
        clearInterval(typingInterval)
      }
    }
  }, [text, delay, delayElapsed])

  const cursorOpacity = useSpring({
    opacity: cursorVisible ? 1 : 0,
    config: config.default,
  })

  return (
    <View style={styles.container}>
      <AnimatedText style={[styles.cursor, cursorOpacity]}>|</AnimatedText>
      <Text style={styles.text}>{visibleText}</Text>
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
