import { useNostr } from 'app/lib/useNostr'
// import { useNostr } from 'app/hooks/useNostr'
// import { ChatMessage } from 'app/models/ChatMessage'
import { Channel } from 'app/models/Channel'
import { useStore } from 'app/stores'
import { ChatMessage } from 'app/stores/chat'
import { handleEvent } from './handleEvent'

export const useMessagesForChannel = (channelId: string) => {
  const { relays } = useNostr()

  const [messages, setMessages] = useStore((s) => [s.messages, s.actions.addMessage])
  const [channels, setChannels] = useStore((s) => [s.channels, s.actions.addChannel])

  // Initialize subscriptions for each relay
  relays.forEach((relay) => {
    // Subscribe to the specific channel
    const sub = relay.sub([
      {
        kinds: [42],
        limit: 35,
        tags: [
          ['e', `${channelId}*`, '*', 'root'],
          ['e', `${channelId}*`, '*', 'reply'],
        ],
      },
    ])

    sub.on('event', (event: any) => {
      handleEvent(event, {
        addMessage: (message: ChatMessage) => {
          setMessages((prevMessages) => [...prevMessages, message])
        },
        addChannel: (channel: Channel) => {
          setChannels((prevChannels) => [...prevChannels, channel])
        },
      })
    })
  })

  // Return only messages with matching channelId
  return messages.filter((message) => message.channelId === channelId)
}
