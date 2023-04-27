// Because tamagui does not support onLongPress on its ListItems or Buttons, we'll make our own.

import { useEffect, useState } from 'react'

export function useLongPress(callback, delay = 500) {
  const [pressing, setPressing] = useState(false)
  const [target, setTarget] = useState('')

  useEffect(() => {
    let timerId
    if (pressing) {
      timerId = setTimeout(callback, delay)
    } else {
      clearTimeout(timerId)
    }

    return () => {
      clearTimeout(timerId)
    }
  }, [callback, delay, pressing])

  return {
    target,
    onPressIn: (target: string) => {
      setTarget(target)
      setPressing(true)
    },
    onPressOut: () => {
      setTarget('')
      setPressing(false)
    },
  }
}
