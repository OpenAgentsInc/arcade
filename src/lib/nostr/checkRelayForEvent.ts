import { relayInit } from 'nostr-tools'

export const checkRelayForEvent = async (
  eventId,
  relayUrl = 'wss://arc1.arcadelabs.co'
) => {
  const relay = relayInit(relayUrl)
  relay.on('connect', () => {
    console.log(`connected to ${relay.url}`)
  })
  relay.on('error', () => {
    console.log(`failed to connect to ${relay.url}`)
  })

  await relay.connect()

  const sub = relay.sub([
    {
      ids: [eventId],
    },
  ])
  sub.on('event', (event) => {
    console.log('Found:', event)
  })
  sub.on('eose', () => {
    console.log('eose')
    sub.unsub()
  })
}
