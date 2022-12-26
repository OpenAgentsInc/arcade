import { createNewAccount } from './account'
import { bip32 } from './bip32'
import {
  getEventHash,
  NostrEventToSerialize,
  NostrEventToSign,
  NostrKind,
  signEvent,
} from './nip01'
import { timeNowInSeconds } from './timeNowInSeconds'

export const fromTheTop = async () => {
  const { privateKey, publicKey } = createNewAccount()
  if (!privateKey || !publicKey) {
    return false
  }

  const event: NostrEventToSerialize = {
    content: 'Hello world',
    created_at: timeNowInSeconds(),
    kind: NostrKind.text,
    pubkey: publicKey,
    tags: [],
  }

  const id = getEventHash(event)
  console.log(id)

  const eventToSign: NostrEventToSign = {
    ...event,
    id,
  }

  const signedEvent = await signEvent(eventToSign, privateKey)
  console.log('SIGNED EVENT:', signedEvent)
}

export const tryIt = () => {
  let seed = Buffer.alloc(32, 1)
  const root = bip32.fromSeed(seed)
  const key = root.derivePath(`m/44'/1237'/0'/0/0`)
  console.log('publicKey:', key.publicKey.toString('hex'))
  console.log('privatekey:', key.privateKey?.toString('hex'))
}
