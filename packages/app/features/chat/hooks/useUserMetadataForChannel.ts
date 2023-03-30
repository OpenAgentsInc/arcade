import { useStore } from 'stores/index'
import { useEffect } from 'react'
import { useChannelMessages } from 'app/lib/hooks'
import { Channel, ChannelMessage } from 'app/stores/types'

export const useUserMetadataForChannel = (channel: Channel) => {
  const messages: ChannelMessage[] = useChannelMessages(channel)
  useEffect(() => {
    console.log('messages', messages.length)
  }, [messages])
  //   useEffect(() => {
  //     // Extract the list of unique public keys of the senders of the messages
  //     const uniquePubkeys = [
  //       ...new Set(messages.map((message) => message.pubkey)),
  //     ]
  //     console.log('uniquePubkeys', uniquePubkeys.length)
  //     // Now fetch metadata for each pubkey
  //     // uniquePubkeys.forEach((pubkey) => {
  //     //   if (!userMetadata.has(pubkey)) {
  //     //     fetchUser(pubkey)
  //     //   }
  //     // })
  //   }, [messages])
}
