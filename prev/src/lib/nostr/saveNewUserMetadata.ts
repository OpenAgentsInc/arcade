import { generateRandomPlacekitten, timeNowInSeconds } from 'lib/utils'
import { getEventHash, relayInit, signEvent } from 'nostr-tools'

export const saveNewUserMetadata = async ({
  about,
  displayName,
  publicKey,
  privateKey,
  username,
}) => {
  const metadata = {
    name: username,
    displayName,
    about,
    picture: generateRandomPlacekitten(),
    website: null,
  }

  const event: any = {
    content: JSON.stringify(metadata),
    created_at: timeNowInSeconds(),
    kind: 0,
    pubkey: publicKey,
    tags: [],
  }

  // Set the id and sig properties of the event
  event.id = getEventHash(event)
  event.sig = signEvent(event, privateKey)

  // Publish event to relay
  const relayurl = 'wss://arc1.arcadelabs.co'
  const relay = relayInit(relayurl)
  relay.on('connect', () => {
    console.log(`connected to ${relay.url}`)
  })
  relay.on('error', () => {
    console.log(`failed to connect to ${relay.url}`)
  })

  await relay.connect()

  const pub = relay.publish(event)
  pub.on('failed', (err) => {
    console.log('error:', err)
  })
  pub.on('ok', () => {
    console.log('ok')
  })
  pub.on('seen', () => {
    console.log('seen')
  })
}
