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
      const existingIds = state.channels.map((channel) => channel.id)
      const newChannels = channels.filter(
        (channel) => !existingIds.includes(channel.id)
      )
      const deduplicatedChannels = [...state.channels, ...newChannels].reduce(
        (acc, channel) => {
          const existingChannel = acc.find((c) => c.id === channel.id)
          if (existingChannel) {
            return acc
          } else {
            return [...acc, channel]
          }
        },
        []
      )
      return {
        channels: deduplicatedChannels,
      }
    })
  },
  addChannelMessages: (channelMessages: ChannelMessage[]) => {
    set((state) => {
      const existingIds = state.channelMessages.map((message) => message.id)
      const newMessages = channelMessages.filter(
        (message) => !existingIds.includes(message.id)
      )
      const deduplicatedMessages = [
        ...state.channelMessages,
        ...newMessages,
      ].reduce((acc, message) => {
        const existingMessage = acc.find((m) => m.id === message.id)
        if (existingMessage) {
          return acc
        } else {
          return [...acc, message]
        }
      }, [])
      return {
        channelMessages: deduplicatedMessages,
      }
    })
  },
  addNotes: (notes: Note[]) => {
    set((state) => {
      const existingIds = state.notes.map((note) => note.id)
      const newNotes = notes.filter((note) => !existingIds.includes(note.id))
      const deduplicatedNotes = [...state.notes, ...newNotes].reduce(
        (acc, note) => {
          const existingNote = acc.find((n) => n.id === note.id)
          if (existingNote) {
            return acc
          } else {
            return [...acc, note]
          }
        },
        []
      )
      return {
        notes: deduplicatedNotes,
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
      const existingPubKeys = state.users.map((user) => user.pubkey)
      const newUsers = users.filter(
        (user) => !existingPubKeys.includes(user.pubkey)
      )
      const deduplicatedUsers = [...state.users, ...newUsers].reduce(
        (acc, user) => {
          const existingUser = acc.find((u) => u.pubkey === user.pubkey)
          if (existingUser) {
            if (existingUser.created_at < user.created_at) {
              return acc.map((u) => (u.pubkey === user.pubkey ? user : u))
            } else {
              return acc
            }
          } else {
            return [...acc, user]
          }
        },
        []
      )
      return {
        users: deduplicatedUsers,
      }
    })
  },

  // single
  addChannel: (channel: Channel) => {
    set((state) => {
      const existingIds = state.channels.map((channel) => channel.id)
      const newChannels = [channel].filter(
        (channel) => !existingIds.includes(channel.id)
      )
      const deduplicatedChannels = [...state.channels, ...newChannels].reduce(
        (acc, channel) => {
          const existingChannel = acc.find((c) => c.id === channel.id)
          if (existingChannel) {
            return acc
          } else {
            return [...acc, channel]
          }
        },
        []
      )
      return {
        channels: deduplicatedChannels,
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
      const existingUser = state.users.find((u) => u.pubkey === user.pubkey)
      if (!existingUser) {
        return {
          users: [...state.users, user],
        }
      } else {
        if (existingUser.created_at < user.created_at) {
          const updatedUsers = state.users.map((u) => {
            if (u.pubkey === user.pubkey) {
              return user
            }
            return u
          })
          return {
            users: updatedUsers,
          }
        }
      }
    })
  },
})
