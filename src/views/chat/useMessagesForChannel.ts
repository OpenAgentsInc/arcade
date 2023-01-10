/* eslint-disable radix */
import { useNostr } from 'lib/hooks'
import { useEffect } from 'react'
import { useStore } from 'stores'

export const useMessagesForChannel = (channelId: string) => {
  const nostr = useNostr()
  const messages = useStore((state) => state.messages)

  useEffect(() => {
    const sub = nostr.subscribeToChannel(channelId)

    return () => {
      console.log(`closing subscriptions for ${channelId}`)
      sub.unsub()
    }
  }, [channelId])

  return messages
    .filter((message) => message.channelId === channelId)
    .sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp))
}
