import { useStore } from 'stores'

export const useGlobalFeed = () => {
  const events = useStore((s) => s.events)
  const filteredEvents = events.filter((e) => e.kind === 1)
  return filteredEvents
}
