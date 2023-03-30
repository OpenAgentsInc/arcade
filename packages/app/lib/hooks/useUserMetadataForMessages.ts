import { ChannelMessage } from 'app/stores/types'

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
  const pubkeys = getUniquePubkeys(messages)
  console.log('Unique pubkeys:', pubkeys.length)

  return messages.map((message) => {
    return {
      ...message,
      user: {
        pubkey: message.pubkey,
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/300',
      },
    }
  })
}

function getUniquePubkeys(messages: ChannelMessage[]): string[] {
  const pubkeySet = new Set<string>()

  messages.forEach((message) => {
    pubkeySet.add(message.pubkey)
  })

  return Array.from(pubkeySet)
}
