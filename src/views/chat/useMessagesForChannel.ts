/* eslint-disable radix */
import { handleEvent, useRelayPool } from 'app/lib/nostr'
import { daysAgoInSeconds } from 'app/lib/utils'
// import { useNostr } from 'lib/hooks'
import { useEffect } from 'react'
import { Alert } from 'react-native'
import { useStore } from 'stores'

export const useMessagesForChannel = (channelId: string) => {
  //   const nostr = useNostr()
  const messages = useStore((state) => state.channelMessages)

  const relaypool = useRelayPool()
  useEffect(() => {
    if (messages.length === 0)
      relaypool.relayPool?.subscribe(
        [
          {
            kinds: [42],
            '#e': [channelId],
            since: daysAgoInSeconds(3),
          },
        ],
        relaypool.relays.map((relay) => relay.url),
        (event) => {
          handleEvent(event)
        },
        (eose) => {
          // console.log('eose for ', channelId)
        }
      )
  }, [channelId])

  //   useEffect(() => {
  //     if (!nostr) return
  //     const sub = nostr.subscribeToChannel(channelId)

  //     return () => {
  //       console.log(`closing subscriptions for ${channelId}`)
  //       sub.unsub()
  //     }
  //   }, [channelId, nostr])

  return messages
    .filter((message) => message.channel_id === channelId)
    .sort((a, b) => a.created_at - b.created_at)
}
