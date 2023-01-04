import { timeNowInSeconds } from 'app/lib/utils'
import { getEventHash, signEvent } from 'nostr-tools'

export interface Channel {
  id: string
  kind: number
  pubkey: string
  sig: string
  tags: string[]
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
}

const initialChatState: ChatState = {
  channels: [],
  messages: [],
}

export const createChatStore = (set: any, get: any) => ({
  channels: initialChatState.channels,
  messages: initialChatState.messages,
  chatActions: {
    addMessage: (message: ChatMessage) =>
      set((state) => {
        if (state.messages.some((m) => m.id === message.id)) {
          return state
        }
        console.log('Saving message ID:', message.id) // to channel: ', message.channelId)
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

      // Get relays from the state
      const { relays } = state

      // Create the event object
      let event: any = {
        kind: 42,
        pubkey: publicKey,
        created_at: timeNowInSeconds(),
        tags: [['e', channelId]],
        content: text,
      }
      // Set the id and sig properties of the event
      event.id = getEventHash(event)
      event.sig = signEvent(event, privateKey)

      // Publish the event to all of the relays
      relays.forEach((relay) => {
        console.log('Publishing to relay: ', relay.url)
        let pub = relay.publish(event)
        pub.on('ok', () => {
          console.log(`${relay.url} has accepted our event`)
        })
        pub.on('seen', () => {
          console.log(`we saw the event on ${relay.url}`)
        })
        pub.on('failed', (reason) => {
          console.log(`failed to publish to ${relay.url}: ${reason}`)
        })
      })
    },
  },
})
