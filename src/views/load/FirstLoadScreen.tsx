import { useNavigation } from '@react-navigation/native'
import { useRelayPool } from 'app/lib/nostr'
import { db } from 'lib/database'
import { databaseReport } from 'lib/database/databaseReport'
import { getFriendMetadata } from 'lib/nostr/getFriendMetadata'
import { resetToTabs } from 'lib/utils/nav'
import { useEffect, useState } from 'react'
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
  //   useRelayPool({ connectNow: true })

  const doFirstLoad = async () => {
    // First we'll check to see what's in the database
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
                {tableCounts.arc_users}
              </Text>
            </XStack>
            <XStack justifyContent="space-between">
              <Text color={noteTypeColor} fontSize={noteFontSize}>
                Posts
              </Text>
              <Text color={noteCountColor} fontSize={noteFontSize}>
                {tableCounts.arc_notes}
              </Text>
            </XStack>

            <XStack justifyContent="space-between">
              <Text color={noteTypeColor} fontSize={noteFontSize}>
                Reactions
              </Text>
              <Text color={noteCountColor} fontSize={noteFontSize}>
                {tableCounts.arc_reactions}
              </Text>
            </XStack>

            <XStack justifyContent="space-between">
              <Text color={noteTypeColor} fontSize={noteFontSize}>
                Channels
              </Text>
              <Text color={noteCountColor} fontSize={noteFontSize}>
                {tableCounts.arc_channels}
              </Text>
            </XStack>

            <XStack justifyContent="space-between">
              <Text color={noteTypeColor} fontSize={noteFontSize} mr="$8">
                Messages
              </Text>
              <Text color={noteCountColor} fontSize={noteFontSize}>
                {tableCounts.arc_channel_messages}
              </Text>
            </XStack>
          </YStack>
        )}
      </Stack>
    </Screen>
  )
}
