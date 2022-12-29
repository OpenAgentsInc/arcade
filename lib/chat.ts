// export type Event = {
//     id?: string
//     sig?: string
//     kind: Kind
//     tags: string[][]
//     pubkey: string
//     content: string
//     created_at: number
//   }

import { Event } from './nostr-tools/event'
import { timeNowInSeconds } from './utils'

const NOSTR_CHANNEL_ID = '25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb'

export const sendChannelMessage = (
  text: string,
  relay: any,
  channelId: string = NOSTR_CHANNEL_ID
) => {
  if (!relay) {
    return
  }
  console.log('got relay?!', relay)

  const event: Event = {
    content: text,
    created_at: timeNowInSeconds(),
    kind: 42,
    pubkey: '12345',
    tags: [['e', channelId]],
  }

  console.log('almost ready to publish event:', event)
  //   relay.publish(event)

  // relay.pub({
  //     kind: 42,
  //     content: text,
  //     '#e': channelId,
  // })
}
