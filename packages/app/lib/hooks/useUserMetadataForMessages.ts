import { ChannelMessage } from 'app/stores/types'
import { SimplePool } from 'nostr-tools'
import { useState, useEffect, useMemo } from 'react'
import { generateRandomPlacekitten } from '../utils'

const relays = [
  'wss://relay.damus.io',
  'wss://arc1.arcadelabs.co',
  'wss://relay.snort.social',
  'wss://eden.nostr.land',
  'wss://nos.lol',
  'wss://brb.io',
  'wss://relay.current.fyi',
  'wss://nostr.orangepill.dev',
  'wss://nostr-pub.wellorder.net',
  'wss://nostr.bitcoiner.social',
  'wss://nostr.oxtr.dev',
]

export function useUserMetadataForMessages(messages: ChannelMessage[]) {
  const [messagesWithMetadata, setMessagesWithMetadata] = useState<
    ChannelMessage[]
  >([])

  useEffect(() => {
    const pubkeys = getUniquePubkeys(messages)
    console.log('Unique pubkeys:', pubkeys.length)

    async function fetchData() {
      const userMetadata = await fetchUserMetadata(pubkeys)
      console.log('User metadata:', Object.keys(userMetadata).length, 'users')

      const updatedMessages = messages.map((message) => {
        const metadata = userMetadata[message.pubkey] || {
          name: message.pubkey.slice(0, 10),
          avatar: generateRandomPlacekitten(),
        }

        return {
          ...message,
          user: {
            pubkey: message.pubkey,
            ...metadata,
          },
        }
      })

      setMessagesWithMetadata(updatedMessages)
    }

    fetchData()
  }, [messages])

  return messagesWithMetadata
}

async function fetchUserMetadata(pubkeys: string[]) {
  const pool = new SimplePool()
  const userMetadata: { [pubkey: string]: { name: string; avatar: string } } =
    {}

  const sub = pool.sub(
    relays,
    pubkeys.map((pubkey) => ({ authors: [pubkey] }))
  )

  return new Promise<typeof userMetadata>((resolve) => {
    sub.on('event', (event) => {
      console.log('event')
      const metadata = JSON.parse(event.content)
      console.log('found metadata:', metadata)
      userMetadata[event.pubkey] = {
        name: metadata.name || 'Unknown',
        avatar: metadata.avatar || 'https://i.pravatar.cc/300',
      }
    })

    sub.on('eose', () => {
      console.log('eose...')
      resolve(userMetadata)
    })
  })
}

function getUniquePubkeys(messages: ChannelMessage[]): string[] {
  const pubkeySet = new Set<string>()

  messages.forEach((message) => {
    pubkeySet.add(message.pubkey)
  })

  return Array.from(pubkeySet)
}
