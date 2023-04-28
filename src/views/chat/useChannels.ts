import { useStore } from 'stores'

export const useChannels = () => {
  const channels = useStore((s) => s.channels)
  return channels
}
