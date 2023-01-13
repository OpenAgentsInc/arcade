import { useNavigation } from '@react-navigation/native'
import { hydrateStoreFromDatabase } from 'app/lib/database/hydrateStoreFromDatabase'
import { handleEvent, NostrEvent, relayPoolInstance } from 'app/lib/nostr'
import { db } from 'lib/database'
import { databaseReport } from 'lib/database/databaseReport'
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

  const channels = useStore((s) => s.channels)
  const channelMessages = useStore((s) => s.channelMessages)
  const notes = useStore((s) => s.notes)
  const users = useStore((s) => s.users)

  const getFriendMetadata = async () => {
    const relays = useStore.getState().relays
    const events: NostrEvent[] = []
    const pubkeys = useStore.getState().friends

    relays.forEach((relayInfo) => {
      const relay = relayPoolInstance?.relayByUrl.get(relayInfo.url)
      if (!relay) return
      const sub = relay.sub([{ authors: pubkeys, kinds: [0] }])

      sub.on('event', (event) => {
        if (event.kind === 0) {
          console.log('skip saving kind0')
          console.log(`Got kind0 for ${event.pubkey}!`)
          try {
            handleEvent(event)
            events.push(event)
          } catch (e) {
            console.log('error handling event', e)
          }
        }
      })

      sub.on('eose', () => {
        // resolve(events)
        sub.unsub()
      })
    })
  }

  const doFirstLoad = async () => {
    hydrateStoreFromDatabase()
    const counts = (await databaseReport(db)) as TableCounts
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
