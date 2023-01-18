export interface Channel {
  id: string
  pubkey: string
  sig: string
  name: string
  about: string
  picture: string
  created_at: number
}

export interface ChannelMessage {
  id: string
  content: string
  created_at: number
  kind: number
  pubkey: string
  sig: string
  tags: string
  channel_id?: string
  reply_event_id?: string
}

export interface DirectMessage {
  id: string
  content: string
  created_at: number
  kind: number
  pubkey: string
  sig: string
  tags: string
  conversation_id: string
  read: boolean
}

export interface Note {
  id: string
  content: string
  created_at: number
  kind: number
  pubkey: string
  sig: string
  tags: string
  main_event_id?: string
  reply_event_id?: string
  user_mentioned?: boolean
  seen?: boolean
}

export interface Reaction {
  id: string
  content: string
  created_at: number
  kind: number
  pubkey: string
  sig: string
  tags: string
  event_id?: string
  type?: number
}

export interface User {
  id: string
  pubkey: string
  name: string
  display_name?: string
  picture: string
  about: string
  main_relay?: string
  contact?: boolean
  follower?: boolean
  lnurl?: string
  created_at: number
}
