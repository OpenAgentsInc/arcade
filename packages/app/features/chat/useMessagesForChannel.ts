import { handleEvent } from 'app/lib/handleEvent'
import { useStore } from 'app/stores'
import { useEffect } from 'react'

export const useMessagesForChannel = (channelId: string) => {
  const relays = useStore((s) => s.relays)
  const chatActions = useStore((s) => s.chatActions)
  const relayActions = useStore((s) => s.relayActions)
  const messages = useStore((s) => s.messages)

  useEffect(() => {
    console.log('creating subscriptions for', channelId)
    console.log('Relays:', relays)
    relays.forEach((relay) => {
      console.log('Checking relay:', relay)
      if (!relayActions.hasSubscription({ relayUrl: relay.url, channelId })) {
        console.log(`creating subscription for ${channelId} on relay ${relay.url}`)
        const sub = relay.sub([{ kinds: [42], tags: [['p', channelId]] }])
        relayActions.addSubscription({ relayUrl: relay.url, sub, channelId })
        sub.on('event', (event: any) => handleEvent(event, chatActions))
        sub.on('eose', () => {
          console.log(`unsubscribing from relay ${relay.url} due to EOSE event`)
          relayActions.removeSubscription({ relayUrl: relay.url, sub, channelId })
        })
      }
    })
    return () => {
      console.log(`closing subscriptions for ${channelId}`)
      relayActions.clearSubscriptions()
    }
  }, [channelId, relays])
  return messages.filter((message) => message.channelId === channelId)
}
