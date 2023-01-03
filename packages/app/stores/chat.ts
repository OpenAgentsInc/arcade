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
        console.log('Saving channel ID:', channel.id)
        return {
          channels: [...state.channels, channel],
        }
      }),
    sendMessage: async (text: string, channelId: string) => {
      console.log('Sending message: ', text, ' to channel: ', channelId)
      console.log('Testing we have state:')
      // Get the current state
      const state = get()

      // Get the public and private keys of the authed user
      const { publicKey, privateKey } = state.user
      console.log('publicKey:', publicKey)
    },
  },
})
