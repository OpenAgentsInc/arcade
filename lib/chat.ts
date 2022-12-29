import useRelayConnection from '../hooks/useRelayConnection'

const NOSTR_CHANNEL_ID = '25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb'

export const sendChannelMessage = (
  text: string,
  relay: any,
  channelId: string = NOSTR_CHANNEL_ID
) => {
  if (!relay) {
    return
  }
  console.log('got relay?!', relay)
  // relay.pub({
  //     kind: 42,
  //     content: text,
  //     '#e': channelId,
  // })
}
