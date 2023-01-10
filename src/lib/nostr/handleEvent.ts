/* eslint-disable no-case-declarations */

import { Channel, ChatMessage } from 'app/stores/chat'

export const handleEvent = (
  event: any,
  actions: {
    addChannel: (channel: Channel) => void
    addEvent: (event: any) => void
    addMessage: (message: ChatMessage) => void
  }
) => {
  try {
    actions.addEvent(event)
    switch (event.kind) {
      case 40:
        // Event is a channel
        const channel: Channel = {
          id: event.id,
          kind: event.kind,
          pubkey: event.pubkey,
          sig: event.sig,
          tags: event.tags,
          metadata: JSON.parse(event.content),
          timestamp: event.created_at.toString(),
        }
        actions.addChannel(channel)
        break

      case 42:
        let channelId: string
        const channelTag = event.tags.find((tag) => tag[0] === 'e')
        if (channelTag) {
          channelId = channelTag[1]
        } else {
          channelId = 'unknown'
          console.log('Could not find channel ID in message tags')
          return
        }

        // Event is a message
        const message: ChatMessage = {
          id: event.id,
          channelId, // ?
          sender: event.pubkey,
          text: event.content,
          timestamp: event.created_at.toString(),
        }
        actions.addMessage(message)
        break

      default:
        console.log(`Unhandled event kind: ${event.kind}`)
    }
  } catch (e) {
    console.log('Error handling event', e)
  }
}
