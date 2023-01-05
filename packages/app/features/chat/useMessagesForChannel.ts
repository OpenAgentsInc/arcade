import { handleEvent } from 'app/lib/handleEvent'
import { useStore } from 'app/stores'
import { useEffect } from 'react'

export const useMessagesForChannel = (channelId: string) => {
  const relays = useStore((s) => s.relays)
  const chatActions = useStore((s) => s.chatActions)
  const relayActions = useStore((s) => s.relayActions)
  const messages = useStore((s) => s.messages)

  useEffect(() => {
    relays.forEach((relay) => {
      if (!relayActions.hasSubscription(relay.url, channelId)) {
        const sub = relay.sub([{ kinds: [42], '#e': [channelId], limit: 50 }])
        relayActions.addSubscription({ relayUrl: relay.url, sub, channelId })
        sub.on('event', (event: any) => handleEvent(event, chatActions))
        sub.on('eose', () => {
          relayActions.removeSubscription({ relayUrl: relay.url, channelId })
          sub.unsub()
          console.log(`Removed subscription for ${channelId} from ${relay.url}`)
        })
      }
    })
    return () => {
      console.log(`closing subscriptions for ${channelId}`)
      relayActions.clearSubscriptions()
    }
  }, [channelId, relays])
  return messages
    .filter((message) => message.channelId === channelId)
    .sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp))
}
