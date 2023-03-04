import { generateRandomPlacekitten, timeNowInSeconds } from 'lib/utils'
import { getEventHash, relayInit, signEvent } from 'nostr-tools'

export const saveNewUserMetadata = ({
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
  relayInit('wss://arc1.arcadelabs.co').publish(event)
}
