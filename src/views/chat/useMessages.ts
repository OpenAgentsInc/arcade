import { useStore } from 'app/stores'

export const useMessages = () => {
  const messages = useStore((s) => s.messages)
  return messages
}
