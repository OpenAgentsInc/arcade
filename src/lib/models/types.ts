export interface Block {
  kind: 'mention' | 'hashtag' | 'text'
  mention?: Mention
  hashtag?: string
  text?: string
}

export interface Mention {
  index: number
  type: MentionType
  ref: ReferencedId
}

export enum MentionType {
  Event = 'event',
  Pubkey = 'pubkey',
}

export interface NostrPost {
  kind: PostKind
  content: string
  references: ReferencedId[]
}

export enum PostKind {
  TextPost = 1,
  ImagePost = 2,
  AudioPost = 3,
}

export interface PostTags {
  blocks: Block[]
  tags: string[][]
}

export interface ReferencedId {
  key: string
  refId: string
  relayId: string | null
}
