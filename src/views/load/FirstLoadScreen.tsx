import { useNavigation } from '@react-navigation/native'
import { hydrateStoreFromDatabase } from 'lib/database'
import { resetToTabs } from 'lib/utils/nav'
import { useEffect, useState } from 'react'
import { useStore } from 'stores'
import { Spinner, Stack, Text, XStack, YStack } from 'tamagui'

import { Screen } from '../shared'

const noteTypeColor = '$color9'
const noteCountColor = '$color12'
const noteFontSize = 20

export const FirstLoadScreen = () => {
  const navigation = useNavigation()
  const [done, setDone] = useState(false)

  const channels = useStore((s) => s.channels)
  const channelMessages = useStore((s) => s.channelMessages)
  const notes = useStore((s) => s.notes)
  const users = useStore((s) => s.users)

  useEffect(() => {
    if (done) {
      resetToTabs(navigation)
    }
  }, [done])

  useEffect(() => {
    if (
      channels.length > 10 &&
      channelMessages.length > 10 &&
      notes.length > 10 &&
      users.length > 8
    ) {
      console.log('setdone placeholder')
      //   setDone(true)
    }
  }, [channels, channelMessages, notes, users])

  useEffect(() => {
    hydrateStoreFromDatabase()
  }, [])

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
            <Text color={noteCountColor} fontSize={noteFontSize}>
              {users.length}
            </Text>
          </XStack>
          <XStack justifyContent="space-between">
            <Text color={noteTypeColor} fontSize={noteFontSize}>
              Posts
            </Text>
            <Text color={noteCountColor} fontSize={noteFontSize}>
              {notes.length}
            </Text>
          </XStack>

          <XStack justifyContent="space-between">
            <Text color={noteTypeColor} fontSize={noteFontSize}>
              Channels
            </Text>
            <Text color={noteCountColor} fontSize={noteFontSize}>
              {channels.length}
            </Text>
          </XStack>

          <XStack justifyContent="space-between">
            <Text color={noteTypeColor} fontSize={noteFontSize} mr="$8">
              Messages
            </Text>
            <Text color={noteCountColor} fontSize={noteFontSize}>
              {channelMessages.length}
            </Text>
          </XStack>
        </YStack>
      </Stack>
    </Screen>
  )
}
