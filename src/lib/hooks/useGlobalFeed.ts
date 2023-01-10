import { useStore } from 'stores'

export const useGlobalFeed = () => {
  return useStore((s) => s.events)
}
