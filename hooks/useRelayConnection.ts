import useChatStore, { ChatMessage } from '../components/store'
import { relayInit } from '../lib/nostr-tools/relay'

const useRelayConnection = () => {
  const relay = useChatStore((state) => state.relay)
  const messages = useChatStore((state) => state.messages)
  const addMessage = useChatStore((state) => state.addMessage)

  const connect = async () => {
    const relay = relayInit('wss://relay.nostr.ch')

    useChatStore.setState({ relay })

    await relay.connect()
    relay.on('connect', () => {
      console.log(`connected to ${relay.url}`)
    })
    relay.on('error', () => {
      console.log(`failed to connect to ${relay.url}`)
    })

    // Channel creation event of Nostr channel
    // let sub = relay.sub([
    //   {
    //     kinds: [40],
    //     limit: 15,
    //     ids: ['25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb'],
    //   },
    // ])

    // Messages in Nostr channel
    let sub = relay.sub([
      {
        kinds: [42],
        limit: 15,
        '#e': ['25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb'],
      },
    ])

    sub.on('event', (event: any) => {
      console.log('got event:', event)
      const message: ChatMessage = {
        id: event.id,
        sender: event.pubkey,
        text: event.content,
        timestamp: event.created_at.toString(),
      }
      addMessage(message)
      //   setMessages((prevMessages) => [...prevMessages, message])
    })
  }

  //   useEffect(() => {
  //     connect()
  //   }, [])

  console.log('returning relay?', relay)

  return {
    relay,
    messages,
    connect,
  }
}

export default useRelayConnection
