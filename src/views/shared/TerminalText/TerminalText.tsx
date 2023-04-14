import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { animated, config, useSpring } from '@react-spring/native'

const AnimatedText = animated(Text)

export const TerminalText = ({
  text,
  delay = 100,
  initialDelay = 0,
  style: textStyle = {},
}) => {
  const [visibleText, setVisibleText] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const [typingFinished, setTypingFinished] = useState(false)

  useEffect(() => {
    let timeoutId: any = null
    let typingInterval: any = null

    const startTyping = () => {
      typingInterval = setInterval(() => {
        setVisibleText((prevText) => {
          if (prevText.length < text.length) {
            return text.slice(0, prevText.length + 1)
          } else {
            setTypingFinished(true)
            clearInterval(typingInterval)
            return prevText
          }
        })
      }, delay)
    }

    timeoutId = setTimeout(startTyping, initialDelay)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(typingInterval)
    }
  }, [text, delay, initialDelay])

  useEffect(() => {
    let cursorBlinkInterval: any = null

    const startCursorBlink = () => {
      cursorBlinkInterval = setInterval(() => {
        setCursorVisible((prevVisible) => !prevVisible)
      }, 500)
    }

    const timeoutId = setTimeout(startCursorBlink, initialDelay)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(cursorBlinkInterval)
    }
  }, [initialDelay])

  const cursorOpacity = useSpring({
    opacity: cursorVisible ? 1 : 0,
    config: config.default,
  })

  return (
    <View style={styles.container}>
      <Text style={[styles.text, textStyle]}>{visibleText}</Text>
      {!typingFinished && visibleText.length > 0 && (
        <AnimatedText style={[styles.cursor, cursorOpacity, textStyle]}>
          |
        </AnimatedText>
      )}
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
