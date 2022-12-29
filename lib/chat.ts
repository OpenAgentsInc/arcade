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
import useChatStore from '../components/store'
import { createNewAccount } from './account'
import { getEventHash, NostrEventToSerialize, NostrEventToSign, signEvent } from './nip01'
import { Event, Kind } from './nostr-tools/event'
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

  const { privkey: privateKey, pubkey: publicKey } = useChatStore.getState()

  if (!privateKey || !publicKey) {
    return false
  }

  const event: NostrEventToSerialize = {
    content: text,
    created_at: timeNowInSeconds(),
    kind: 42 as any,
    pubkey: publicKey,
    tags: [['e', channelId]],
  }

  console.log(`almost ready to publish event from pubkey: ${publicKey}:`, event)

  const id = getEventHash(event)
  console.log(id)

  const eventToSign: NostrEventToSign = {
    ...event,
    id,
  }

  const signature = await signEvent(eventToSign, privateKey)
  console.log('here ursignature:', signature)

  const signedEvent: Event = {
    ...(eventToSign as any),
    sig: signature,
  }

  //   console.log(signedEvent)

  relay.publish(signedEvent)

  // relay.pub({
  //     kind: 42,
  //     content: text,
  //     '#e': channelId,
  // })
}
