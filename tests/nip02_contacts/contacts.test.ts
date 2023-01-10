import { parseContactListEvent } from './nip02'

describe('parseContactListEvent', () => {
  test('parses contact list event', () => {
    const event = {
      kind: 3,
      tags: [
        ['p', '91cf9..4e5ca', 'wss://alicerelay.com/', 'alice'],
        ['p', '14aeb..8dad4', 'wss://bobrelay.com/nostr', 'bob'],
        ['p', '612ae..e610f', 'ws://carolrelay.com/ws', 'carol'],
      ],
      content: '',
      // ...other fields
    }

    const contacts = parseContactListEvent(event)

    expect(contacts).toEqual([
      {
        key: '91cf9..4e5ca',
        relay: 'wss://alicerelay.com/',
        petname: 'alice',
      },
      {
        key: '14aeb..8dad4',
        relay: 'wss://bobrelay.com/nostr',
        petname: 'bob',
      },
      {
        key: '612ae..e610f',
        relay: 'ws://carolrelay.com/ws',
        petname: 'carol',
      },
    ])
  })

  test('ignores tags that do not start with p', () => {
    const event = {
      kind: 3,
      tags: [
        ['p', '91cf9..4e5ca', 'wss://alicerelay.com/', 'alice'],
        ['notp', '14aeb..8dad4', 'wss://bobrelay.com/nostr', 'bob'],
        ['p', '612ae..e610f', 'ws://carolrelay.com/ws', 'carol'],
      ],
      content: '',
      // ...other fields
    }

    const contacts = parseContactListEvent(event)

    expect(contacts).toEqual([
      {
        key: '91cf9..4e5ca',
        relay: 'wss://alicerelay.com/',
        petname: 'alice',
      },
      {
        key: '612ae..e610f',
        relay: 'ws://carolrelay.com/ws',
        petname: 'carol',
      },
    ])
  })
})
