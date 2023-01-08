// import useChatStore from 'stores/chat'
// import { getEventHash, NostrEventToSerialize, NostrEventToSign, signEvent } from './nip01'
// import { Event } from './nostr-tools/event'
// import { timeNowInSeconds } from './utils'

export const sendChannelMessage = async (
  text: string,
  //   relay: any,
  channelId: string
) => {
  alert('implementing this next :)')
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
