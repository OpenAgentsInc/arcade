import { timeNowInSeconds } from 'lib/utils'
import { getEventHash, relayInit, signEvent } from 'nostr-tools'
import { Channel } from 'stores/types'

interface SaveNewChannelProps {
  channel: Channel
  publicKey: string
  privateKey: string
}

export const saveNewChannel = async ({
  channel,
  publicKey,
  privateKey,
}: SaveNewChannelProps) => {
  const chan = {
    about: channel.about,
    title: channel.title,
    picture: channel.picture,
  }

  const event: any = {
    content: JSON.stringify(chan),
    created_at: timeNowInSeconds(),
    kind: 40,
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
  pub.on('ok', (ok) => {
    console.log('ok')
  })
  pub.on('seen', (seen) => {
    console.log('seen')
  })

  return {
    eventid: event.id,
    relayurl,
  }
}
