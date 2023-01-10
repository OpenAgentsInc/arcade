import { FollowState, NostrEvent, ReferencedId } from './types'

export class Contacts {
  // Set of strings representing the pubkeys of the user's friends
  private friends: Set<string> = new Set()
  // Set of strings representing the pubkeys of the user's friends-of-friends
  private friend_of_friends: Set<string> = new Set()
  // The pubkey of the user
  readonly our_pubkey: string
  // An optional event containing the user's contact information
  event?: NostrEvent

  // Constructor
  // @param our_pubkey - The pubkey of the user
  constructor(our_pubkey: string) {
    this.our_pubkey = our_pubkey
  }

  // Returns an array of strings containing the pubkeys of the user's friends and friends-of-friends
  get_friendosphere(): string[] {
    // Array of strings representing the pubkeys of the user's friends
    const fs: string[] = this.get_friend_list()
    // Push the pubkeys of the user's friends-of-friends to the array
    fs.push(...this.get_friend_of_friend_list())
    // Return the array of pubkeys
    return fs
  }

  // Removes a friend from the user's friend list
  // @param pubkey - The pubkey of the friend to remove
  remove_friend(pubkey: string): void {
    this.friends.delete(pubkey)
  }

  // Returns an array of strings containing the pubkeys of the user's friends
  get_friend_list(): string[] {
    // Returns an array of strings created from the user's friends Set
    return Array.from(this.friends)
  }

  // Returns an array of strings containing the pubkeys of the user's friends-of-friends
  get_friend_of_friend_list(): string[] {
    // Returns an array of strings created from the user's friends-of-friends Set
    return Array.from(this.friend_of_friends)
  }

  // Adds a friend to the user's friend list
  // @param pubkey - The pubkey of the friend to add
  add_friend_pubkey(pubkey: string): void {
    this.friends.add(pubkey)
  }

  // Adds a friend to the user's friend list and adds the friend's friends-of-friends to the user's friend-of-friends list
  // @param contact - The event containing the contact information of the friend to add
  add_friend_contact(contact: NostrEvent): void {
    this.friends.add(contact.pubkey)
    // Iterate over the tags in the contact's event
    for (const tag of contact.tags) {
      // If the tag is a friend-of-friend tag
      if (tag.length >= 2 && tag[0] == 'p') {
        // Add the friend-of-friend's pubkey to the user's friend-of-friends list
        this.friend_of_friends.add(tag[1])
      }
    }
  }

  // Checks if a pubkey is in the user's friend-of-friends list
  // @param pubkey - The pubkey to check
  // @returns true if the pubkey is in the user's friend-of-friends list, false otherwise
  is_friend_of_friend(pubkey: string): boolean {
    // Returns true if the pubkey is in the user's friend-of-friends list, false otherwise
    return this.friend_of_friends.has(pubkey)
  }

  // Checks if a pubkey is in the user's friendosphere (friend or friend-of-friend)
  // @param pubkey - The pubkey to check
  // @returns true if the pubkey is in the user's friendosphere, false otherwise
  is_in_friendosphere(pubkey: string): boolean {
    // Returns true if the pubkey is in the user's friends list or friend-of-friends list, false otherwise
    return this.friends.has(pubkey) || this.friend_of_friends.has(pubkey)
  }

  // Checks if a pubkey is in the user's friends list
  // @param pubkey - The pubkey to check
  // @returns true if the pubkey is in the user's friends list, false otherwise
  is_friend(pubkey: string): boolean {
    // Returns true if the pubkey is in the user's friends list, false otherwise
    return this.friends.has(pubkey)
  }

  /**
   * Check if the given public key is either our own or a friend's.
   * @param pubkey The public key to check
   * @returns true if the given public key is either our own or a friend's; false otherwise
   */
  is_friend_or_self(pubkey: string): boolean {
    return pubkey == this.our_pubkey || this.is_friend(pubkey)
  }

  /**
   * Get the follow state for the given public key.
   * @param pubkey The public key to check
   * @returns FollowState.follows if the public key is a friend's; FollowState.unfollows otherwise
   */
  follow_state(pubkey: string): FollowState {
    return this.is_friend(pubkey) ? FollowState.follows : FollowState.unfollows
  }
}

export function createContacts(
  relays: RelayDescriptor[],
  ourPubkey: string,
  follow: ReferencedId
): NostrEvent {
  // Create a NostrEvent object with the given parameters
  // The kind of the event is set to NostrKind.contacts.rawValue
  // The content of the event is created with create_contacts_content()
  // The tags of the event include the tag corresponding to the given follow reference
  const kind: number = NostrKind.contacts.rawValue
  const content: string = createContactsContent(relays) ?? '{}'
  const tags: string[][] = [refidToTag(follow)]
  return new NostrEvent(content, ourPubkey, kind, tags)
}

export function createContactsContent(
  relays: RelayDescriptor[]
): string | undefined {
  // Create a JSON object containing the given relay descriptors
  // The object is encoded as a string and returned
  // If the object cannot be created, undefined is returned
  const crelays: { [key: string]: RelayInfo } = makeContactRelays(relays)
  const encoded: string | undefined = encodeJson(crelays)
  return encoded
}

export function followUser(
  pool: RelayPool,
  ourContacts: NostrEvent | undefined,
  pubkey: string,
  privkey: string,
  follow: ReferencedId
): NostrEvent | undefined {
  // Create a NostrEvent object to follow the given user
  // The event is created with follow_user_event() and our contacts
  // The event is then signed with our private key and sent to the given pool
  const ev: NostrEvent | undefined = followUserEvent(
    ourContacts,
    ourPubkey,
    follow
  )
  if (!ev) {
    return undefined
  }

  ev.calculateId()
  ev.sign(privkey)

  pool.send(ev)

  return ev
}

/**
 * unfollowUser is a function that takes in a RelayPool, a NostrEvent, a public key, a private key, and a string to unfollow.
 * It returns a NostrEvent or null.
 * @param pool RelayPool object
 * @param ourContacts NostrEvent object
 * @param pubkey string representing the public key
 * @param privkey string representing the private key
 * @param unfollow string to unfollow
 * @returns NostrEvent or null
 */
const unfollowUser = (
  pool: RelayPool,
  ourContacts: NostrEvent | null,
  pubkey: string,
  privkey: string,
  unfollow: string
): NostrEvent | null => {
  if (ourContacts === null) {
    return null
  }

  const ev = unfollowUserEvent(ourContacts, pubkey, unfollow)
  ev.calculate_id()
  ev.sign(privkey)

  pool.send({ event: ev })

  return ev
}

/**
 * unfollowUserEvent is a function that takes in a NostrEvent, a public key, and a string to unfollow.
 * It returns a NostrEvent.
 * @param ourContacts NostrEvent object
 * @param ourPubkey string representing the public key
 * @param unfollow string to unfollow
 * @returns NostrEvent
 */
const unfollowUserEvent = (
  ourContacts: NostrEvent,
  ourPubkey: string,
  unfollow: string
): NostrEvent => {
  const tags = ourContacts.tags.filter((tag) => {
    if (tag.length >= 2 && tag[0] === 'p' && tag[1] === unfollow) {
      return false
    }
    return true
  })

  const kind = NostrKind.contacts.rawValue
  return new NostrEvent(ourContacts.content, ourPubkey, kind, tags)
}

/**
 * followUserEvent is a function that takes in a NostrEvent, a public key, and a ReferencedId to follow.
 * It returns a NostrEvent or null.
 * @param ourContacts NostrEvent object
 * @param ourPubkey string representing the public key
 * @param follow ReferencedId to follow
 * @returns NostrEvent or null
 */
const followUserEvent = (
  ourContacts: NostrEvent | null,
  ourPubkey: string,
  follow: ReferencedId
): NostrEvent | null => {
  if (ourContacts === null) {
    return null
  }

  const ev = followWithExistingContacts(ourPubkey, ourContacts, follow)

  return ev
}

/**
 * decodeJsonRelays is a function that takes in a string representing content.
 * It returns an array of strings and RelayInfo or null.
 * @param content string representing content
 * @returns [string, RelayInfo] or null
 */
const decodeJsonRelays = (content: string): [string, RelayInfo] | null => {
  return decodeJson(content)
}

/**
 * Removes a relay from a given event.
 *
 * @param ev The NostrEvent to remove the relay from.
 * @param currentRelays An array of RelayDescriptors.
 * @param privkey The private key associated with the event.
 * @param relay The relay to remove.
 * @returns The modified NostrEvent, or null if the operation failed.
 */
const removeRelay = (
  ev: NostrEvent,
  currentRelays: RelayDescriptor[],
  privkey: string,
  relay: string
): NostrEvent | null => {
  const relays = ensureRelayInfo(relays, ev.content)
  delete relays[relay]

  console.log(`remove_relay ${relays}`)

  const content = encodeJson(relays)
  if (content === null) {
    return null
  }

  const newEv = new NostrEvent(content, ev.pubkey, 3, ev.tags)
  newEv.calculate_id()
  newEv.sign(privkey)
  return newEv
}

/**
 * Adds a relay to a given event.
 *
 * @param ev The NostrEvent to add the relay to.
 * @param privkey The private key associated with the event.
 * @param currentRelays An array of RelayDescriptors.
 * @param relay The relay to add.
 * @param info The information associated with the relay.
 * @returns The modified NostrEvent, or null if the operation failed.
 */
const addRelay = (
  ev: NostrEvent,
  privkey: string,
  currentRelays: RelayDescriptor[],
  relay: string,
  info: RelayInfo
): NostrEvent | null => {
  const relays = ensureRelayInfo(relays, ev.content)

  if (relays.indexOf(relay) !== -1) {
    return null
  }

  relays[relay] = info

  const content = encodeJson(relays)
  if (content === null) {
    return null
  }

  const newEv = new NostrEvent(content, ev.pubkey, 3, ev.tags)
  newEv.calculate_id()
  newEv.sign(privkey)
  return newEv
}

/**
 * Ensures that the relay info is valid.
 *
 * @param relays An array of RelayDescriptors.
 * @param content The content of the event.
 * @returns An array of [string, RelayInfo] if the content is valid, or a new array of relays if it is not.
 */
const ensureRelayInfo = (
  relays: RelayDescriptor[],
  content: string
): [string, RelayInfo] => {
  const relayInfo = decodeJsonRelays(content)
  if (relayInfo === null) {
    return makeContactRelays(relays)
  }
  return relayInfo
}

/**
 * This function follows an existing contact with a given reference ID.
 * It takes our public key, our contacts, and the reference ID to follow as parameters.
 * It returns either a new NostrEvent or null.
 *
 * @param ourPubkey Our public key
 * @param ourContacts Our contacts
 * @param follow The reference ID to follow
 * @returns A new NostrEvent or null
 */
const followWithExistingContacts = (
  ourPubkey: string,
  ourContacts: NostrEvent,
  follow: ReferencedId
): NostrEvent | null => {
  // Check if we already have a contact with the given reference ID
  if (ourContacts.references(follow.ref_id, 'p')) {
    // If we do, return null
    return null
  }

  // Otherwise, create a new NostrEvent
  const kind = NostrKind.contacts.rawValue // The kind of the event
  const tags = ourContacts.tags // The tags of the event
  // Add the reference ID to the tags
  tags.push(refidToTag(follow))
  // Return the new NostrEvent
  return new NostrEvent(ourContacts.content, ourPubkey, kind, tags)
}

/**
 * This function takes an array of RelayDescriptor objects and returns a dictionary of type "String: RelayInfo"
 * The key of the dictionary is the URL of the RelayDescriptor object and the value is the RelayInfo object associated with that URL.
 *
 * @param relays An array of RelayDescriptor objects
 * @returns A dictionary with the URL of the RelayDescriptor object as the key and the associated RelayInfo object as the value
 */
function make_contact_relays(relays: RelayDescriptor[]): {
  [key: string]: RelayInfo
} {
  // reduce() takes an accumulator and a callback function, which is used to reduce the array to a single value.
  // In this case, the accumulator is an empty dictionary, and the callback function adds each RelayDescriptor object to the dictionary.
  return relays.reduce(
    (acc: { [key: string]: RelayInfo }, relay: RelayDescriptor) => {
      // The key of the dictionary is the URL of the RelayDescriptor object and the value is the RelayInfo object associated with that URL.
      acc[relay.url.absoluteString] = relay.info
      return acc
    },
    {}
  )
}

/**
 * This function takes a NostrEvent object, a Keypair object, and a Contacts object and returns a boolean.
 * The boolean indicates whether or not the event is a "friend event"
 *
 * @param ev A NostrEvent object
 * @param keypair A Keypair object
 * @param contacts A Contacts object
 * @returns A boolean indicating whether or not the event is a "friend event"
 */
function is_friend_event(
  ev: NostrEvent,
  keypair: Keypair,
  contacts: Contacts
): boolean {
  // Check if the event was sent by a friend
  if (!contacts.is_friend(ev.pubkey)) {
    return false
  }

  // Check if the event is a reply to the keypair
  if (ev.is_reply(keypair.privkey)) {
    return true
  }

  // Get a set of referenced IDs from the event tags
  const pks = get_referenced_id_set(ev.tags, 'p')

  // If there are no references, it is a reply to self
  if (pks.count === 0) {
    return true
  }

  // Allow reply-to-self-or-friend case
  if (pks.count === 1 && contacts.is_friend(pks.first!.ref_id)) {
    return true
  }

  // Show our replies?
  for (const pk of pks) {
    // Don't count self mentions here
    if (pk.ref_id !== ev.pubkey && contacts.is_friend(pk.ref_id)) {
      return true
    }
  }

  return false
}
