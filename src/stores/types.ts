export interface Channel {
  id: string
  about: string
  title: string
  picture: string
}

export interface ChannelMessage {
  id: string
  content: string
  created_at: number
  pubkey: string
}
