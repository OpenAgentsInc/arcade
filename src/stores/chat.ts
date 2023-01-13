import { delay, timeNowInSeconds } from 'lib/utils'
import { getEventHash, Kind, signEvent } from 'nostr-tools'

export interface Channel {
  id: string
  kind: Kind
  pubkey: string
  sig: string
  tags: string[][]
  metadata: {
    about: string
    name: string
    picture: string
    [key: string]: any
  }
  timestamp: string
}

export interface ChatMessage {
  id: string
  channelId: string
  sender: string
  text: string
  timestamp: string
}

export interface ChatState {
  channels: Channel[]
  messages: ChatMessage[]
  userMetadata: Map<string, any>
}

const initialChatState: ChatState = {
  channels: [],
  messages: [],
  userMetadata: new Map(),
}

export const createChatStore = (set: any, get: any) => ({
  channels: initialChatState.channels,
  messages: initialChatState.messages,
  userMetadata: initialChatState.userMetadata,
  chatActions: {
    // Given an array of channels, just set that to the state
    setChannels: (channels: Channel[]) => set({ channels }),

    fetchUser: async (pubkey: string) => {
      const state = get()
      const { relays } = state

      function onEvent(event: any, relay: string) {
        if (event.kind === 0) {
          // Parse the event's "content" as a JSON object and add it to the list of "userMetadata" in the state
          const content = JSON.parse(event.content)
          set((state) => ({
            // https://docs.pmnd.rs/zustand/guides/maps-and-sets-usage
            userMetadata: new Map(state.userMetadata).set(pubkey, content),
          }))
          console.log(
            `Saved metadata for user ${content?.name ?? 'unknown'}: `,
            pubkey
          )
        }
      }

      // Iterate over the list of relays
      relays.forEach((relay) => {
        // Set up a stream that filters for events with a "kind" of 0 and an "author" that matches the given public key
        const stream = relay.sub([{ kinds: [0], authors: [pubkey] }])
        // Pass the "onEvent" function as the callback for the stream
        stream.on('event', onEvent)
        // Unsubscribe from the stream after a 1 second delay
        setTimeout(() => {
          stream.unsub()
        }, 1000)
      })
    },

    checkAllUserMetadata: async (channelId: string) => {
      try {
        const state = get()
        const { chatActions, messages, userMetadata } = state
        const fetchUser = chatActions.fetchUser

        // Filter the list of messages for those that have a matching channelId
        const filteredMessages = messages.filter(
          (message) => message.channelId === channelId
        )

        // Extract the list of unique public keys of the senders of the filtered messages
        const uniquePubkeys = [
          ...new Set(filteredMessages.map((message) => message.sender)),
        ]

        console.log(
          `Found ${uniquePubkeys.length} unique pubkeys in this channel.`
        )

        // Now fetch metadata for each pubkey
        for (const pubkey of uniquePubkeys) {
          if (userMetadata.has(pubkey)) {
            console.log(`Already have metadata for ${pubkey}`)
            continue
          } else {
            console.log(`Fetching metadata for ${pubkey}`)
            await delay(250)
            fetchUser(pubkey)
          }
        }
      } catch (e: any) {
        console.log(':(', e)
        console.log(e.stack)
      }
    },

    addMessage: (message: ChatMessage) =>
      set((state) => {
        if (state.messages.some((m) => m.id === message.id)) {
          console.log('Already have message', message.id)
          return state
        }
        // console.log('Saving message ID:', message.id) // to channel: ', message.channelId)
        return {
          messages: [...state.messages, message],
        }
      }),
    addChannel: (channel: Channel) =>
      set((state) => {
        if (state.channels.some((c) => c.id === channel.id)) {
          return state
        }
        console.log('Saving channel: ', channel.metadata.name)
        return {
          channels: [...state.channels, channel],
        }
      }),
    sendMessage: async (text: string, channelId: string) => {
      console.log('Sending message: ', text, ' to channel: ', channelId)
      // Get the current state
      const state = get()

      // Get the public and private keys of the authed user
      const { publicKey, privateKey } = state.user

      // Create the event object
      const event: any = {
        kind: 42,
        pubkey: publicKey,
        created_at: timeNowInSeconds(),
        tags: [['e', channelId]],
        content: text,
      }
      // Set the id and sig properties of the event
      event.id = getEventHash(event)
      event.sig = signEvent(event, privateKey)

      state.nostr.publish(event)
    },
  },
})
