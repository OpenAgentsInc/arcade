import { useStore } from 'app/stores'
import { Channel, ChatMessage } from 'app/stores/chat'
import { isWeb } from '@my/ui'
import { Event } from './Event'

export const handleEvent = (
  event: any,
  actions: { addChannel: (channel: Channel) => void; addMessage: (message: ChatMessage) => void }
) => {
  if (!isWeb) {
    const classyEvent = new Event(event)
    const userPubKey = useStore.getState().user.publicKey
    const database = useStore.getState().database
    if (!database) {
      throw new Error('Database not initialized')
    }
    classyEvent.save(database.database, userPubKey)
  }

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
}
