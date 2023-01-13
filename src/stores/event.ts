import { NostrEvent } from 'lib/nostr'

import { Channel, ChannelMessage, Note, Reaction, User } from './eventTypes'

export interface EventsState {
  events: NostrEvent[]
  channels: Channel[]
  channelMessages: ChannelMessage[]
  notes: Note[]
  reactions: Reaction[]
  users: User[]
}

const initialEventsState: EventsState = {
  events: [],
  channels: [],
  channelMessages: [],
  notes: [],
  reactions: [],
  users: [],
}

export const createEventsStore = (set: any, get: any) => ({
  channels: initialEventsState.channels,
  channelMessages: initialEventsState.channelMessages,
  notes: initialEventsState.notes,
  reactions: initialEventsState.reactions,
  users: initialEventsState.users,
  events: initialEventsState.events,
  addChannels: (channels: Channel[]) => {
    set((state) => {
      return {
        channels: [...state.channels, ...channels],
      }
    })
  },
  addChannelMessages: (channelMessages: ChannelMessage[]) => {
    set((state) => {
      return {
        channelMessages: [...state.channelMessages, ...channelMessages],
      }
    })
  },
  addNotes: (notes: Note[]) => {
    set((state) => {
      return {
        notes: [...state.notes, ...notes],
      }
    })
  },
  addReactions: (reactions: Reaction[]) => {
    set((state) => {
      return {
        reactions: [...state.reactions, ...reactions],
      }
    })
  },
  addUsers: (users: User[]) => {
    set((state) => {
      return {
        users,
      }
    })
  },

  addChannel: (channel: Channel) => {
    set((state) => {
      return {
        channels: [...state.channels, channel],
      }
    })
  },
  addChannelMessage: (channelMessage: ChannelMessage) => {
    set((state) => {
      return {
        channelMessages: [...state.channelMessages, channelMessage],
      }
    })
  },
  addEvent: (event: NostrEvent) => {
    set((state) => {
      return {
        events: [...state.events, event],
      }
    })
  },
  addNote: (note: Note) => {
    set((state) => {
      return {
        notes: [...state.notes, note],
      }
    })
  },
  addReaction: (reaction: Reaction) => {
    set((state) => {
      return {
        reactions: [...state.reactions, reaction],
      }
    })
  },
  addUser: (user: User) => {
    set((state) => {
      if (!state.users.find((u) => u.pubkey === user.pubkey)) {
        return {
          users: [...state.users, user],
        }
      }
    })
  },
})
