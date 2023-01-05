import { useStore } from 'app/stores'
import { useEffect } from 'react'
import { useMessagesForChannel } from './useMessagesForChannel'

export const useUserMetadataForChannel = (channelId: string) => {
  const { fetchUser } = useStore((s) => s.chatActions)
  const messages = useMessagesForChannel(channelId)

  useEffect(() => {
    // Extract the list of unique public keys of the senders of the messages
    const uniquePubkeys = [...new Set(messages.map((message) => message.sender))]

    // Now fetch metadata for each pubkey
    uniquePubkeys.forEach((pubkey) => {
      fetchUser(pubkey)
    })
  }, [messages])
}
