import schnorr from 'bip-schnorr'
import createHash from 'create-hash/browser'

export const signEvent = async (event: NostrEventToSign, key: string) => {
  const eventHash = getEventHash(event)
  const eventBuffer = Buffer.from(eventHash, 'hex')
  return Buffer.from(await schnorr.sign(key, eventBuffer)).toString('hex')
}

export const getEventHash = (event: NostrEventToSerialize) => {
  let eventHash = createHash('sha256')
    .update(Buffer.from(serializeEvent(event)))
    .digest()
  return Buffer.from(eventHash).toString('hex')
}

export const serializeEvent = (event: NostrEventToSerialize) => {
  return JSON.stringify([0, event.pubkey, event.created_at, event.kind, event.tags, event.content])
}

export interface NostrEventToSerialize {
  content: string
  created_at: number
  kind: NostrKind
  pubkey: string
  tags: string[][]
}

export interface NostrEventToSign {
  id: string
  content: string
  created_at: number
  kind: NostrKind
  pubkey: string
  tags: string[][]
}

export enum NostrKind {
  metadata = 0,
  text = 1,
  contacts = 3,
  dm = 4,
  delete = 5,
  boost = 6,
  like = 7,
  channelcreate = 40,
  channelmetadata = 41,
  channelmessage = 42,
  riderequest = 60,
}
