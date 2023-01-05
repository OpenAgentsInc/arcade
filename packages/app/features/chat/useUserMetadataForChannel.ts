import { useStore } from 'app/stores'
import { useEffect } from 'react'
import { useMessagesForChannel } from './useMessagesForChannel'

export const useUserMetadataForChannel = (channelId: string) => {
  if (channelId === '') return
  const { fetchUser } = useStore((s) => s.chatActions)
  const userMetadata = useStore((s) => s.userMetadata)
  const messages = useMessagesForChannel(channelId)

  console.log('USER METADATA', userMetadata)
  console.log(typeof userMetadata)

  useEffect(() => {
    // Extract the list of unique public keys of the senders of the messages
    const uniquePubkeys = [...new Set(messages.map((message) => message.sender))]

    // Now fetch metadata for each pubkey
    uniquePubkeys.forEach((pubkey) => {
      if (!userMetadata.has(pubkey)) {
        fetchUser(pubkey)
      }
    })
  }, [messages])
}
