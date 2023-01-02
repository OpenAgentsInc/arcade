export interface ChatMessage {
  id: string
  sender: string
  text: string
  timestamp: string
}

export interface ChatState {
  channels: any[]
  messages: ChatMessage[]
}

const initialChatState: ChatState = {
  channels: [],
  messages: [],
}

const createChat = (set: any) => ({
  channels: initialChatState.channels,
  messages: initialChatState.messages,
  setChannels: (channels: any[]) => set({ channels }),
  addMessage: (message: ChatMessage) =>
    set((state) => {
      if (state.messages.some((m) => m.id === message.id)) {
        return state
      }
      console.log('Saving message ID:', message.id)
      return {
        messages: [...state.messages, message],
      }
    }),
})

export default createChat
