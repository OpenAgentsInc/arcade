import { NostrEvent, SignedEvent, validateEvent } from 'lib/nostr'
import { Event, getPublicKey, signEvent, verifySignature } from 'nostr-tools'

const event: SignedEvent = {
  id: 'd7dd5eb3ab747e16f8d0212d53032ea2a7cadef53837e5a6c66d42849fcb9027',
  kind: 1,
  pubkey: '22a12a128a3be27cd7fb250cbe796e692896398dc1440ae3fa567812c8107c1c',
  created_at: 1670869179,
  content:
    'NOSTR "WINE-ACCOUNT" WITH HARVEST DATE STAMPED\n\n\n"The older the wine, the greater its reputation"\n\n\n22a12a128a3be27cd7fb250cbe796e692896398dc1440ae3fa567812c8107c1c\n\n\nNWA 2022-12-12\nAA',
  tags: [['client', 'astral']],
  sig: 'f110e4fdf67835fb07abc72469933c40bdc7334615610cade9554bf00945a1cebf84f8d079ec325d26fefd76fe51cb589bdbe208ac9cdbd63351ddad24a57559' as string,
}

const unsigned: Event = {
  created_at: 1671217411,
  kind: 0,
  tags: [],
  content:
    '{"name":"fiatjaf","about":"buy my merch at fiatjaf store","picture":"https://fiatjaf.com/static/favicon.jpg","nip05":"_@fiatjaf.com"}',
  pubkey: '',
}

const privateKey =
  '5c6c25b7ef18d8633e97512159954e1aa22809c6b763e94b9f91071836d00217'

describe('NIP-01: Event creation and signing', () => {
  test('validate event', () => {
    expect(validateEvent(event)).toBeTruthy()
  })

  test('check signature', async () => {
    expect(verifySignature(event as any)).toBeTruthy()
  })

  test('sign event', async () => {
    const pubkey = getPublicKey(privateKey)
    const authored = { ...unsigned, pubkey }

    const sig = signEvent(authored, privateKey)
    const signed = { ...authored, sig }

    expect(verifySignature(signed)).toBeTruthy()
  })

  test('event kind should be a positive integer', () => {
    const invalidEvent = { ...event, kind: -1 }
    expect(validateEvent(invalidEvent)).toBeFalsy()
  })

  test('event created_at should be a valid unix timestamp', () => {
    const invalidEvent = { ...event, created_at: -1 }
    expect(validateEvent(invalidEvent)).toBeFalsy()
  })
})
