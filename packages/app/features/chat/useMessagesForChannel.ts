import { handleEvent } from 'app/lib/handleEvent'
import { useStore } from 'app/stores'
import { useEffect } from 'react'

export const useMessagesForChannel = (channelId: string) => {
  const relays = useStore((s) => s.relays)
  const actions = useStore((s) => s.chatActions)
  const messages = useStore((s) => s.messages)
  const subscriptions = useStore((s) => s.subscriptions)
  useEffect(() => {
    console.log('creating subscriptions for', channelId)
    console.log('Relays:', relays)
    relays.forEach((relay) => {
      console.log('Checking relay:', relay)
      if (!subscriptions[relay.url]) {
        console.log(`creating subscription for ${channelId} on relay ${relay.url}`)
        const sub = relay.sub([{ kinds: [42], tags: [['p', channelId]] }])
        subscriptions[relay.url] = sub
        sub.on('event', (event: any) => handleEvent(event, actions))
        sub.on('eose', () => {
          console.log(`unsubscribing from relay ${relay.url} due to EOSE event`)
          delete subscriptions[relay.url]
        })
      }
    })
    return () => {
      console.log(`closing subscriptions for ${channelId}`)
      Object.values(subscriptions).forEach((sub) => {
        sub.close()
      })
    }
  }, [channelId, relays, subscriptions])
  return messages.filter((message) => message.channelId === channelId)
}
