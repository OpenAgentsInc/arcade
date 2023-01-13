import { Filter, Kind } from '../nip01_events'

export const createInitialSubscriptions = async (
  userPubkey: string,
  friends: string[]
) => {
  if (!userPubkey || userPubkey === '') {
    return []
  }
  friends.push(userPubkey)

  const subscriptions: Filter[] = [
    // Subscribe to the Nostr channel
    {
      kinds: [Kind.ChannelCreation],
      limit: 1,
      ids: ['25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb'],
    },
    // Grab some of the Nostr channel messages
    {
      kinds: [Kind.ChannelMessage],
      limit: 25,
      '#e': [
        '25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb',
      ],
    },
    // Subscribe to other channels
    { kinds: [Kind.ChannelCreation], limit: 20 },
    // Grab user metadata of friends
    { kinds: [Kind.Metadata], authors: friends },
    // Grab home feed
    {
      kinds: [Kind.Text, Kind.ChannelMessage], // , Kind.Repost, Kind.Reaction
      authors: friends,
      limit: 35,
    },
    // Grab our contacts/metadata
    // { kinds: [Kind.Contacts, Kind.Metadata], authors: [userPubkey] },
    // Grab DMs
    // {
    //   kinds: [Kind.EncryptedDirectMessage],
    //   limit: 500,
    //   authors: [userPubkey],
    // },
  ]
  return subscriptions
}
