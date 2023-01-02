export interface ChatState {
  channels: any[]
}

const initialChatState: ChatState = {
  channels: [],
}

const createChat = (set: any) => ({
  channels: initialChatState.channels,
  setChannels: (channels: any[]) => set({ channels }),
})

export default createChat
