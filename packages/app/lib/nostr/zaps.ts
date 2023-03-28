import {
  generatePrivateKey,
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools'

export const createZapRequestNote = (
  senderPrivateKey,
  recipientPubkey,
  relays,
  targetNoteId,
  comment,
  amount
) => {
  console.log('trying to ok hmm')
  try {
    if (!senderPrivateKey) senderPrivateKey = generatePrivateKey()
    console.log('???')
  } catch (e) {
    console.error(e)
  }

  console.log('senderPrivateKey:', senderPrivateKey)

  const senderPubkey = getPublicKey(senderPrivateKey)
  console.log('senderPubkey:', senderPubkey)

  const zapRequestNote = {
    id: '',
    pubkey: senderPubkey,
    created_at: Math.floor(Date.now() / 1000),
    kind: 9734,
    tags: [
      ['p', recipientPubkey],
      ['relays', ...relays],
    ],
    content: comment,
  }

  console.log('zapRequestNote:', zapRequestNote)

  if (targetNoteId) {
    zapRequestNote.tags.push(['e', targetNoteId])
  }

  if (amount) {
    zapRequestNote.tags.push(['amount', amount.toString()])
  }

  // Generate the note ID and sign the note
  zapRequestNote.id = getEventHash(zapRequestNote)

  // @ts-ignore
  zapRequestNote.sig = signEvent(zapRequestNote, senderPrivateKey)

  return zapRequestNote
}
