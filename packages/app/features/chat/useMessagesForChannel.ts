import { handleEvent } from 'app/lib/handleEvent'
import { useNostr } from 'app/lib/useNostr'
import { useStore } from 'app/stores'

export const useMessagesForChannel = (channelId: string) => {
  const { relays } = useNostr()
  const actions = useStore((s) => s.actions)
  const messages = useStore((s) => s.messages)

  // Initialize subscriptions for each relay
  relays.forEach((relay) => {
    // Subscribe to the specific channel
    const sub = relay.sub([
      {
        kinds: [42],
        limit: 25,
        tags: [['e', `${channelId}`]],
      },
    ])

    sub.on('event', (event: any) => {
      handleEvent(event, actions)
    })
  })

  // Return only messages with matching channelId
  return messages.filter((message) => message.channelId === channelId)
}
