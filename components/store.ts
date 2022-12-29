import create from 'zustand'

export interface ChatMessage {
  id: string
  sender: string
  text: string
  timestamp: string
}

interface ChatState {
  messages: ChatMessage[]
  addMessage: (message: ChatMessage) => void
  removeMessage: (id: string) => void
  relay: any
}

const useChatStore = create<ChatState>((set) => ({
  relay: null,
  messages: [],
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
  removeMessage: (id: string) =>
    set((state) => ({ messages: state.messages.filter((m) => m.id !== id) })),
}))

export default useChatStore
