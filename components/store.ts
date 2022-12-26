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
}

const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message: ChatMessage) =>
    // Add message but only if a message with this ID doesn't already exist
    set((state) => ({
      messages: state.messages.some((m) => m.id === message.id)
        ? state.messages
        : [...state.messages, message],
    })),
  removeMessage: (id: string) =>
    set((state) => ({ messages: state.messages.filter((m) => m.id !== id) })),
}))

export default useChatStore
