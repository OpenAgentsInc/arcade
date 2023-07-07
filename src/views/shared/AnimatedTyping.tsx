// @ts-nocheck
import { useEffect, useRef, useState } from 'react'
import { Paragraph } from 'tamagui'

export function AnimatedTyping(props) {
  const [text, setText] = useState('')
  const [cursorColor, setCursorColor] = useState('transparent')
  const [messageIndex, setMessageIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(0)
  const [timeouts, setTimeouts] = useState({
    cursorTimeout: undefined,
    typingTimeout: undefined,
    firstNewLineTimeout: undefined,
    secondNewLineTimeout: undefined,
  })

  const textRef = useRef(text)
  textRef.current = text

  const cursorColorRef = useRef(cursorColor)
  cursorColorRef.current = cursorColor

  const messageIndexRef = useRef(messageIndex)
  messageIndexRef.current = messageIndex

  const textIndexRef = useRef(textIndex)
  textIndexRef.current = textIndex

  const timeoutsRef = useRef(timeouts)
  timeoutsRef.current = timeouts

  const typingAnimation = () => {
    if (textIndexRef.current < props.text[messageIndexRef.current].length) {
      setText(
        textRef.current +
          props.text[messageIndexRef.current].charAt(textIndexRef.current)
      )
      setTextIndex(textIndexRef.current + 1)

      const updatedTimeouts = { ...timeoutsRef.current }
      updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 1)
      setTimeouts(updatedTimeouts)
    } else if (messageIndexRef.current + 1 < props.text.length) {
      setMessageIndex(messageIndexRef.current + 1)
      setTextIndex(0)

      const updatedTimeouts = { ...timeoutsRef.current }
      updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 1)
      setTimeouts(updatedTimeouts)
    } else {
      clearInterval(timeoutsRef.current.cursorTimeout)
      setCursorColor('transparent')

      if (props.onComplete) {
        props.onComplete()
      }
    }
  }

  const cursorAnimation = () => {
    if (cursorColorRef.current === 'transparent') {
      setCursorColor('#8EA960')
    } else {
      setCursorColor('transparent')
    }
  }

  useEffect(() => {
    const updatedTimeouts = { ...timeoutsRef.current }
    updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 50)
    updatedTimeouts.cursorTimeout = setInterval(cursorAnimation, 250)
    setTimeouts(updatedTimeouts)

    return () => {
      clearTimeout(timeoutsRef.current.typingTimeout)
      clearTimeout(timeoutsRef.current.firstNewLineTimeout)
      clearTimeout(timeoutsRef.current.secondNewLineTimeout)
      clearInterval(timeoutsRef.current.cursorTimeout)
    }
  }, [])

  return (
    <Paragraph pl="$3" pr="$5" fontSize={16} color="#fff">
      {text}
      <Paragraph fontSize={16} color={cursorColor}>
        |
      </Paragraph>
    </Paragraph>
  )
}
