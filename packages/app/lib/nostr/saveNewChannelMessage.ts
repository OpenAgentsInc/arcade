import { timeNowInSeconds } from 'app/lib/utils'
import { getEventHash, relayInit, signEvent } from 'nostr-tools'
// import { Channel } from 'stores/types'

interface SaveNewChannelProps {
  channel: any // Channel
  publicKey: string
  privateKey: string
  text: string
}

export const saveNewChannelMessage = async ({
  channel,
  publicKey,
  privateKey,
  text,
}: SaveNewChannelProps) => {
  const event: any = {
    content: text,
    created_at: timeNowInSeconds(),
    kind: 42,
    pubkey: publicKey,
    tags: [['e', channel.eventid, channel.relayurl, 'root']],
  }

  // Set the id and sig properties of the event
  event.id = getEventHash(event)
  event.sig = signEvent(event, privateKey)

  // Publish event to relay
  const relayurl = channel.relayurl
  const relay = relayInit(relayurl)
  relay.on('connect', () => {
    // console.log(`connected to ${relay.url}`)
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
    console.log('ok', event)
  })
  //   pub.on('seen', (seen) => {
  //     console.log('Message seen on relay')
  //   })

  return {
    eventid: event.id,
  }
}
