export interface Channel {
  id: string
  about: string
  eventid: string
  title: string
  picture: string
  relayurl: string
}

export interface ChannelMessage {
  id: string
  content: string
  created_at: number
  pubkey: string
  sats_zapped: number
}
