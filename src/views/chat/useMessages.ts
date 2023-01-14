import { useStore } from 'stores'

export const useMessages = () => {
  const messages = useStore((s) => s.channelMessages)
  return messages
}
