import { useStore } from 'app/stores'

export const useMessagesForChannel = (channelId: string) => {
  const messages = useStore((s) => s.messages)
  return messages.filter((message) => message.channelId === channelId)
}
