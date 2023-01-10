import { NostrEvent } from 'app/lib/nostr'
import { Contacts } from 'app/lib/nostr/experimental/contacts'
import { ReferencedId } from 'app/lib/nostr/experimental/types'

describe('Contacts', () => {
  let contacts: Contacts
  let our_pubkey: string
  //   let relays: RelayDescriptor[]
  let follow: ReferencedId
  let contact: NostrEvent

  beforeEach(() => {
    // Initialize the contacts object
    our_pubkey = 'pubkey1'
    contacts = new Contacts(our_pubkey)
    // Initialize the relays array
    relays = [
      {
        pubkey: 'pubkey2',
        address: 'address2',
        port: 1234,
      },
      {
        pubkey: 'pubkey3',
        address: 'address3',
        port: 5678,
      },
    ]
    // Initialize the follow reference
    follow = {
      type: 'user',
      pubkey: 'pubkey4',
    }
    // Initialize the contact event
    contact = createContacts(relays, our_pubkey, follow)
  })

  describe('constructor', () => {
    it('should set the our_pubkey property', () => {
      expect(contacts.our_pubkey).toBe(our_pubkey)
    })
  })

  describe('get_friendosphere', () => {
    it('should return an empty array when no friends or friends-of-friends are added', () => {
      expect(contacts.get_friendosphere()).toEqual([])
    })

    it("should return an array containing the pubkeys of the user's friends and friends-of-friends", () => {
      contacts.add_friend_pubkey('pubkey2')
      contacts.add_friend_contact(contact)
      expect(contacts.get_friendosphere()).toEqual(['pubkey2', 'pubkey4'])
    })
  })

  describe('remove_friend', () => {
    it("should remove the given pubkey from the user's friend list", () => {
      contacts.add_friend_pubkey('pubkey2')
      contacts.remove_friend('pubkey2')
      expect(contacts.get_friend_list()).toEqual([])
    })
  })

  describe('get_friend_list', () => {
    it('should return an empty array when no friends are added', () => {
      expect(contacts.get_friend_list()).toEqual([])
    })

    it("should return an array containing the pubkeys of the user's friends", () => {
      contacts.add_friend_pubkey('pubkey2')
      expect(contacts.get_friend_list()).toEqual(['pubkey2'])
    })
  })

  describe('get_friend_of_friend_list', () => {
    it('should return an empty array when no friends-of-friends are added', () => {
      expect(contacts.get_friend_of_friend_list()).toEqual([])
    })

    it("should return an array containing the pubkeys of the user's friends-of-friends", () => {
      contacts.add_friend_contact(contact)
      expect(contacts.get_friend_of_friend_list()).toEqual(['pubkey4'])
    })
  })

  describe('add_friend_pubkey', () => {
    it("should add the given pubkey to the user's friend list", () => {
      contacts.add_friend_pubkey('pubkey2')
      expect(contacts.get_friend_list()).toEqual(['pubkey2'])
    })
  })

  describe('add_friend_contact', () => {
    it("should add the given contact's pubkey to the user's friend list", () => {
      contacts.add_friend_contact(contact)
      expect(contacts.get_friend_list()).toEqual(['pubkey4'])
    })

    it("should add the given contact's friends-of-friends to the user's friend-of-friends list", () => {
      contacts.add_friend_contact(contact)
      expect(contacts.get_friend_of_friend_list()).toEqual(['pubkey4'])
    })
  })
})
