import { ContactList } from '../../src/lib/nostr/nip02'

describe('ContactList', () => {
  test('should set kind to 3', () => {
    const contactList = new ContactList()
    expect(contactList.kind).toBe(3)
  })

  test('should add contact to list', () => {
    const contactList = new ContactList()
    const contact = {
      key: '91cf9..4e5ca',
      relayUrl: 'wss://alicerelay.com/',
      petName: 'alice',
    }
    contactList.addContact(contact)
    expect(contactList.tags[0]).toEqual([
      'p',
      '91cf9..4e5ca',
      'wss://alicerelay.com/',
      'alice',
    ])
  })

  test('should overwrite contact list', () => {
    const contactList = new ContactList()
    const contact1 = {
      key: '91cf9..4e5ca',
      relayUrl: 'wss://alicerelay.com/',
      petName: 'alice',
    }
    const contact2 = {
      key: '14aeb..8dad4',
      relayUrl: 'wss://bobrelay.com/nostr',
      petName: 'bob',
    }
    const contact3 = {
      key: '612ae..e610f',
      relayUrl: 'ws://carolrelay.com/ws',
      petName: 'carol',
    }
    contactList.addContact(contact1)
    contactList.addContact(contact2)
    contactList.addContact(contact3)
    expect(contactList.tags).toEqual([
      ['p', '91cf9..4e5ca', 'wss://alicerelay.com/', 'alice'],
      ['p', '14aeb..8dad4', 'wss://bobrelay.com/nostr', 'bob'],
      ['p', '612ae..e610f', 'ws://carolrelay.com/ws', 'carol'],
    ])
  })

  test('should generate petname scheme', () => {
    const contactList = new ContactList()
    const contact1 = {
      key: '21df6d143fb96c2ec9d63726bf9edc71',
      relayUrl: '',
      petName: 'erin',
    }
    const contact2 = {
      key: 'a8bb3d884d5d90b413d9891fe4c4e46d',
      relayUrl: '',
      petName: 'david',
    }
    const contact3 = {
      key: 'f57f54057d2a7af0efecc8b0b66f5708',
      relayUrl: '',
      petName: 'frank',
    }
    contactList.addContact(contact1)
    contactList.addContact(contact2)
    contactList.addContact(contact3)
    expect(
      contactList.generatePetnameScheme('21df6d143fb96c2ec9d63726bf9edc71')
    ).toBe('erin')
    expect(
      contactList.generatePetnameScheme('a8bb3d884d5d90b413d9891fe4c4e46d')
    ).toBe('david.erin')
    expect(
      contactList.generatePetnameScheme('f57f54057d2a7af0efecc8b0b66f5708')
    ).toBe('frank.david.erin')
  })
})
