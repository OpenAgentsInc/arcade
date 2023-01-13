import { relayPoolInstance } from 'app/lib/nostr'
import { timeNowInSeconds } from 'lib/utils'
import { getEventHash, signEvent } from 'nostr-tools'
import { useStore } from 'stores'

export const sendMessage = async (text: string, channelId: string) => {
  console.log('Sending message: ', text, ' to channel: ', channelId)
  // Get the current state

  // Get the public and private keys of the authed user
  //   const { publicKey, privateKey } = state.user
  const { publicKey, privateKey } = useStore.getState().user

  // Create the event object
  const event: any = {
    kind: 42,
    pubkey: publicKey,
    created_at: timeNowInSeconds(),
    tags: [['e', channelId]],
    content: text,
  }
  // Set the id and sig properties of the event
  event.id = getEventHash(event)
  event.sig = signEvent(event, privateKey)

  relayPoolInstance?.publish(
    event,
    useStore.getState().relays.map((r) => r.url)
  )
}
