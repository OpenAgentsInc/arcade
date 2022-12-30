import { display } from 'lib'
import { RelayStore } from '../relay-store'

export const sendChannelMessage = async (self: RelayStore, channelId: string, text: string) => {
  display({
    name: 'sendChannelMessage',
    preview: 'Sending message to channel...',
    value: { channelId, text },
  })
  self.env.nostr.sendChannelMessage(channelId, text)
}
