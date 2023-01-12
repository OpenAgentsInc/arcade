import { useInterval } from 'lib/hooks/useIntervalMine'
import { useEffect, useState } from 'react'
import { Stack, Text } from 'tamagui'

import { Screen } from '../shared'

export const DatabaseTest = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    // increment the count by 1
    const countTimer = setInterval(() => {
      setCount((prevCount) => prevCount + 1)
      // every 1000 milliseconds
    }, 1000)
    // and clear this timer when the component is unmounted
    return function cleanup() {
      clearInterval(countTimer)
    }
  })

  return (
    <Screen>
      <Stack jc="center" f={1} ai="center">
        <Text color="white">Count: {count}</Text>
      </Stack>
    </Screen>
  )
}
