// import useChatStore from 'stores/chat'
// import { getEventHash, NostrEventToSerialize, NostrEventToSign, signEvent } from './nip01'
// import { Event } from './nostr-tools/event'
// import { timeNowInSeconds } from './utils'

const NOSTR_CHANNEL_ID = '25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb'

export const sendChannelMessage = async (
  text: string,
  //   relay: any,
  channelId: string = NOSTR_CHANNEL_ID
) => {
  console.log('DO IT - skipping', text)
  return
  //   const { privkey: privateKey, pubkey: publicKey } = useChatStore.getState()

  //   if (!privateKey || !publicKey) {
  //     return false
  //   }

  //   const event: NostrEventToSerialize = {
  //     content: text,
  //     created_at: timeNowInSeconds(),
  //     kind: 42 as any,
  //     pubkey: publicKey,
  //     tags: [['e', channelId]],
  //   }

  //   const id = getEventHash(event)

  //   const eventToSign: NostrEventToSign = {
  //     ...event,
  //     id,
  //   }

  //   const signature = await signEvent(eventToSign, privateKey)

  //   const signedEvent: Event = {
  //     ...(eventToSign as any),
  //     sig: signature,
  //   }

  //   relay.publish(signedEvent)
}
