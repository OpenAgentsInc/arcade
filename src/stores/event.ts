import { NostrEvent } from 'lib/nostr'

export interface EventsState {
  events: NostrEvent[]
}

const initialEventsState: EventsState = {
  events: [],
}

export const createEventsStore = (set: any, get: any) => ({
  events: initialEventsState.events,
  addEvent: (event: NostrEvent) => {
    set((state) => {
      return {
        events: [...state.events, event],
      }
    })
  },
})
