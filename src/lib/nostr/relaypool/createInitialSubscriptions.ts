import { initialSubscriptions } from 'views/chat/initialSubscriptions'

import { Filter, Kind } from '../nip01_events'

let created: boolean = false

export const createInitialSubscriptions = (
  userPubkey: string,
  friends: string[]
) => {
  if (!userPubkey || userPubkey === '') {
    return []
  }

  if (created) {
    return []
  }

  const subscriptions = [...initialSubscriptions]

  friends.push(userPubkey)

  const contactsFilters: Filter[] = [
    { kinds: [Kind.Metadata], authors: friends },
  ]
  subscriptions.push(...contactsFilters)

  const ourContactsFilters: Filter[] = [
    { kinds: [Kind.Contacts, Kind.Metadata], authors: [userPubkey] },
  ]
  subscriptions.push(...ourContactsFilters)

  const dmsFilters: Filter[] = [
    {
      kinds: [Kind.EncryptedDirectMessage],
      limit: 500,
      authors: [userPubkey],
    },
  ]
  subscriptions.push(...dmsFilters)

  const homeFilters: Filter[] = [
    {
      kinds: [Kind.Text, Kind.ChannelMessage, Kind.Repost, Kind.Reaction],
      authors: friends,
      limit: 10,
    },
  ]
  subscriptions.push(...homeFilters)

  console.log(`Created initial subscriptions for ${userPubkey}.`)

  created = true

  return subscriptions
}
