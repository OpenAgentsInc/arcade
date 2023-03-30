import { ChannelMessage } from 'app/stores/types'
import { SimplePool } from 'nostr-tools'
import { useState, useEffect, useMemo } from 'react'
import { generateRandomPlacekitten } from '../utils'

const relays = [
  'wss://relay.damus.io',
  'wss://arc1.arcadelabs.co',
  'wss://relay.snort.social',
]

const pool = new SimplePool()

// const relays = [
//   'wss://relay.damus.io',
//   'wss://arc1.arcadelabs.co',
//   'wss://relay.snort.social',
//   'wss://eden.nostr.land',
//   'wss://nos.lol',
//   'wss://brb.io',
//   'wss://relay.current.fyi',
//   'wss://nostr.orangepill.dev',
//   'wss://nostr-pub.wellorder.net',
//   'wss://nostr.bitcoiner.social',
//   'wss://nostr.oxtr.dev',
// ]

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
  const userMetadata: {
    [pubkey: string]: { name: string; avatar: string; lud16: string | null }
  } = {}

  try {
    await pool.ensureRelay(relays[0] as string)
    await pool.ensureRelay(relays[1] as string)
    await pool.ensureRelay(relays[2] as string)

    const events = await pool.list(relays, [{ authors: pubkeys, kinds: [0] }])

    events.forEach((event) => {
      const metadata = JSON.parse(event.content)
      userMetadata[event.pubkey] = {
        name: metadata.name || 'Unknown',
        avatar: metadata.picture || generateRandomPlacekitten(),
        lud16: metadata.lud16 || null,
      }
    })

    return userMetadata
  } catch (error) {
    console.error('Error fetching user metadata:', error)
    throw error
  }
}

function getUniquePubkeys(messages: ChannelMessage[]): string[] {
  const pubkeySet = new Set<string>()

  messages.forEach((message) => {
    pubkeySet.add(message.pubkey)
  })

  return Array.from(pubkeySet)
}
