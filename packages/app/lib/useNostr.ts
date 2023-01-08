import { useStore } from 'app/stores'

export const useNostr = () => {
  const nostr = useStore((s) => s.nostr)
  return nostr
}
