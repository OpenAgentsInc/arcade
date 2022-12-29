// export type Event = {
//     id?: string
//     sig?: string
//     kind: Kind
//     tags: string[][]
//     pubkey: string
//     content: string
//     created_at: number
//   }

import { Alert } from 'react-native'
import { createNewAccount } from './account'
import { getEventHash, NostrEventToSerialize, NostrEventToSign, signEvent } from './nip01'
import { Event } from './nostr-tools/event'
import { timeNowInSeconds } from './utils'

const NOSTR_CHANNEL_ID = '25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb'

export const sendChannelMessage = async (
  text: string,
  relay: any,
  channelId: string = NOSTR_CHANNEL_ID
) => {
  if (!relay) {
    return
  }

  const { privateKey, publicKey } = createNewAccount()

  if (!privateKey || !publicKey) {
    return false
  }

  const event: NostrEventToSerialize = {
    content: text,
    created_at: timeNowInSeconds(),
    kind: 42,
    pubkey: publicKey,
    tags: [['e', channelId]],
  }

  console.log('almost ready to publish event:', event)

  const id = getEventHash(event)
  console.log(id)

  const eventToSign: NostrEventToSign = {
    ...event,
    id,
  }

  const signedEvent = await signEvent(eventToSign, privateKey)
  Alert.alert('here ur signed event:', signedEvent)

  //   relay.publish(event)

  // relay.pub({
  //     kind: 42,
  //     content: text,
  //     '#e': channelId,
  // })
}
