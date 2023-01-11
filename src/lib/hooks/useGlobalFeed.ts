import { useStore } from 'stores'

export const useGlobalFeed = () => {
  const events = useStore((s) => s.events)
  const filteredEvents = events
    .filter((e) => e.kind === 1)
    .filter((e) => e.content !== '')
    .sort((a, b) => b.created_at - a.created_at)
  return filteredEvents
}
