/*
 * chatgpt summary, take with grain of salt
 *
 * This code exports a hook that sets up subscriptions on all relays in useNostr for a given channelId.
 * It returns the messages for that that channelId.
 * When an EOSE event is received, the hook unsubscribes from that relay.
 *
 * It first fetches the relays from useNostr and sets up subscriptions for kind-42 events on all of them.
 * It then filters the messages in the store by the given channelId and returns them.
 * It also sets up an event listener for EOSE events, and unsubscribes from the relay when one is received.
 */

import { handleEvent } from 'app/lib/handleEvent'
import { useNostr } from 'app/lib/useNostr'
import { useStore } from 'app/stores'
import { useEffect, useRef } from 'react'

export const useMessagesForChannel = (channelId: string) => {
  const { relays } = useNostr()
  const actions = useStore((s) => s.actions)
  const messages = useStore((s) => s.messages)
  const subRef = useRef<{ [relayUrl: string]: any }>({})
  useEffect(() => {
    console.log('creating subscriptions for', channelId)
    console.log('Relays:', relays)
    relays.forEach((relay) => {
      console.log('Checking relay:', relay)
      if (!subRef.current[relay.url]) {
        console.log(`creating subscription for ${channelId} on relay ${relay.url}`)
        const sub = relay.sub([{ kinds: [42], tags: [['p', channelId]] }])
        subRef.current[relay.url] = sub
        sub.on('event', (event: any) => handleEvent(event, actions))
        sub.on('eose', () => {
          console.log(`unsubscribing from relay ${relay.url} due to EOSE event`)
          delete subRef.current[relay.url]
        })
      }
    })
    return () => {
      console.log(`closing subscriptions for ${channelId}`)
      Object.values(subRef.current).forEach((sub) => {
        sub.close()
      })
    }
  }, [channelId, relays])
  return messages.filter((message) => message.channelId === channelId)
}
