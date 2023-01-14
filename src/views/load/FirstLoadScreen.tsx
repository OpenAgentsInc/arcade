import { useNavigation } from '@react-navigation/native'
import { useInterval } from 'app/lib/hooks'
import { hydrateStoreFromDatabase } from 'lib/database'
import { resetToTabs } from 'lib/utils/nav'
import { useEffect, useState } from 'react'
import { useStore } from 'stores'
import { Spinner, Stack, Text, XStack, YStack } from 'tamagui'

import { Screen } from '../shared'

const noteTypeColor = '$color9'
const noteCountColor = '$color12'
const noteFontSize = 20
const countWidth = 50

export const FirstLoadScreen = () => {
  const navigation = useNavigation()
  const [done, setDone] = useState(false)
  const [timeoutId, setTimeoutId] = useState<any>(null)
  const { channels, channelMessages, notes, users } = useStore()

  useEffect(() => {
    if (done) {
      resetToTabs(navigation)
    }
  }, [done])

  useEffect(() => {
    if (notes.length > 5 && users.length > 8) {
      // clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      // set new timeout to call setDone after 500ms
      const newTimeoutId = setTimeout(() => {
        setDone(true)
      }, 1500)
      setTimeoutId(newTimeoutId)
    }
  }, [channels, channelMessages, notes, users])

  useEffect(() => {
    return () => {
      // clear timeout on unmount
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  useEffect(() => {
    hydrateStoreFromDatabase()
  }, [])

  //   useInterval(() => {
  // //     hydrateStoreFromDatabase()
  // // //   }, 2500)

  return (
    <Screen>
      <Stack f={1} jc="center" ai="center">
        <Spinner mt={-60} size="large" color="$color11" />
        <Text color="$color11" mt="$6" fontSize={24} fontWeight="700">
          Loading from relays
        </Text>
        <YStack mt="$6" space="$3">
          <XStack justifyContent="space-between">
            <Text color={noteTypeColor} fontSize={noteFontSize}>
              Users
            </Text>
            <Text
              color={noteCountColor}
              fontSize={noteFontSize}
              w={countWidth}
              textAlign="right"
            >
              {users.length}
            </Text>
          </XStack>
          <XStack justifyContent="space-between">
            <Text color={noteTypeColor} fontSize={noteFontSize}>
              Posts
            </Text>
            <Text
              color={noteCountColor}
              fontSize={noteFontSize}
              w={countWidth}
              textAlign="right"
            >
              {notes.length}
            </Text>
          </XStack>

          <XStack justifyContent="space-between">
            <Text color={noteTypeColor} fontSize={noteFontSize}>
              Channels
            </Text>
            <Text
              color={noteCountColor}
              fontSize={noteFontSize}
              w={countWidth}
              textAlign="right"
            >
              {channels.length}
            </Text>
          </XStack>

          <XStack justifyContent="space-between">
            <Text color={noteTypeColor} fontSize={noteFontSize} mr="$8">
              Messages
            </Text>
            <Text
              color={noteCountColor}
              fontSize={noteFontSize}
              w={countWidth}
              textAlign="right"
            >
              {channelMessages.length}
            </Text>
          </XStack>
        </YStack>
      </Stack>
    </Screen>
  )
}
