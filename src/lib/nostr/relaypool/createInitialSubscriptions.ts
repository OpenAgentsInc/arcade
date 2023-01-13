import { Filter, Kind } from '../nip01_events'

export const createInitialSubscriptions = (
  userPubkey: string,
  friends: string[]
) => {
  if (!userPubkey || userPubkey === '') {
    return []
  }

  // Subscribe to the Nostr channel
  const initialSubscriptions = [
    {
      kinds: [40],
      limit: 1,
      ids: ['25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb'],
    },
    // Subscribe to other channels
    { kinds: [40], limit: 20 },
    // Subscribe to messages and grab some
    { kinds: [42], limit: 10 },
  ]

  //   console.log('creating this filter for friends:', friends)

  const subscriptions = [...initialSubscriptions]

  friends.push(userPubkey)

  console.log('MAKING CONTACTSFILTERS WITH FRIENDS:', friends)
  const contactsFilters: Filter[] = [
    { kinds: [Kind.Metadata], authors: friends },
  ]
  subscriptions.push(...contactsFilters)

  //   const ourContactsFilters: Filter[] = [
  //     { kinds: [Kind.Contacts, Kind.Metadata], authors: [userPubkey] },
  //   ]
  //   subscriptions.push(...ourContactsFilters)

  //   const dmsFilters: Filter[] = [
  //     {
  //       kinds: [Kind.EncryptedDirectMessage],
  //       limit: 500,
  //       authors: [userPubkey],
  //     },
  //   ]
  //   subscriptions.push(...dmsFilters)

  const homeFilters: Filter[] = [
    {
      kinds: [Kind.Text, Kind.ChannelMessage], // , Kind.Repost, Kind.Reaction
      authors: friends,
      limit: 35,
    },
  ]
  subscriptions.push(...homeFilters)

  return subscriptions
}
