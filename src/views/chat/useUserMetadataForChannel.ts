import { handleEvent, useRelayPool } from 'app/lib/nostr'
import { getNostrEvent } from 'app/lib/nostr/getNostrEvent'
import { useEffect } from 'react'

// import { useStore } from 'stores'
import { useMessagesForChannel } from './useMessagesForChannel'

export const useUserMetadataForChannel = (channelId: string) => {
  //   const { fetchUser } = useStore((s) => s.chatActions)
  //   const userMetadata = useStore((s) => s.userMetadata)
  const messages = useMessagesForChannel(channelId)

  const relaypool = useRelayPool()
  useEffect(() => {
    // Extract the list of unique public keys of the senders of the messages
    const uniquePubkeys = [
      ...new Set(messages.map((message) => message.pubkey)),
    ] as string[]

    if (uniquePubkeys.length === 0) {
      console.log('no unique pubkeys. returning')
    }

    // Now fetch metadata for each pubkey
    relaypool.relayPool?.subscribe(
      [
        {
          kinds: [0],
          authors: uniquePubkeys,
        },
      ],
      relaypool.relays.map((relay) => relay.url),
      (event) => {
        handleEvent(event)
      },
      (eose) => {
        console.log('eose for ', channelId)
      }
    )
  }, [messages, channelId])
}
