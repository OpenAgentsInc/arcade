import { useStore } from 'app/stores'

export const useChannels = () => {
  const channels = useStore((s) => s.channels)
  return channels
}
