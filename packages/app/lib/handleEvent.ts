import { Channel, ChatMessage } from 'app/stores/chat'

export const handleEvent = (
  event: any,
  actions: { addChannel: (channel: Channel) => void; addMessage: (message: ChatMessage) => void }
) => {
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
      // Event is a message
      const message: ChatMessage = {
        id: event.id,
        channelId: '25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb', // ?
        sender: event.pubkey,
        text: event.content,
        timestamp: event.created_at.toString(),
      }
      actions.addMessage(message)
      break

    default:
      console.log(`Unhandled event kind: ${event.kind}`)
  }
}
