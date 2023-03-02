export interface Channel {
  id: string
  about: string
  name: string
  picture: string
}

export interface ChannelMessage {
  id: string
  content: string
  created_at: number
  pubkey: string
}
