import { useNavigation } from '@react-navigation/native'
import { hydrateStoreFromDatabase } from 'app/lib/database/hydrateStoreFromDatabase'
import { db } from 'lib/database'
import { databaseReport } from 'lib/database/databaseReport'
import { getFriendMetadata } from 'lib/nostr/getFriendMetadata'
import { resetToTabs } from 'lib/utils/nav'
import { useEffect, useState } from 'react'
import { useStore } from 'stores'
import { Spinner, Stack, Text, XStack, YStack } from 'tamagui'

import { Screen } from '../shared'

interface TableCounts {
  arc_notes: number
  arc_reactions: number
  arc_users: number
  arc_channels: number
  arc_channel_messages: number
}

const noteTypeColor = '$color9'
const noteCountColor = '$color12'
const noteFontSize = 20

export const FirstLoadScreen = () => {
  const navigation = useNavigation()
  const [done, setDone] = useState(false)
  const [tableCounts, setTableCounts] = useState<TableCounts>()

  const channels = useStore((s) => s.channels)
  const channelMessages = useStore((s) => s.channelMessages)
  const notes = useStore((s) => s.notes)
  const users = useStore((s) => s.users)

  const doFirstLoad = async () => {
    hydrateStoreFromDatabase()

    const counts = (await databaseReport(db)) as TableCounts
    setTableCounts(counts)
    console.log(counts)

    if (counts.arc_users < 10) {
      const evt = await getFriendMetadata()
      console.log(evt)
    }
  }

  useEffect(() => {
    if (done) {
      resetToTabs(navigation)
    }
  }, [done])

  useEffect(() => {
    setTimeout(() => {
      doFirstLoad()
    }, 100)
  }, [])

  return (
    <Screen>
      <Stack f={1} jc="center" ai="center">
        <Spinner mt={-60} size="large" color="$color11" />
        <Text color="$color11" mt="$6" fontSize={24} fontWeight="700">
          Loading from relays
        </Text>
        {tableCounts && (
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
        )}
      </Stack>
    </Screen>
  )
}
