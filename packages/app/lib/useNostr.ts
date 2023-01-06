import { initialSubscriptions } from 'app/features/chat/initialSubscriptions'
import { useStore } from 'app/stores'
import { relayInit } from 'nostr-tools'
import { handleEvent } from './handleEvent'

export const useNostr = () => {
  const relayActions = useStore((s) => s.relayActions)
  const store = useStore()
  console.log(store)
  //   console.log('relayActions?', relayActions)
  const chatActions = useStore((s) => s.chatActions)
  const relays = useStore((s) => s.relays)

  const connect = async (urls: string[]) => {
    let index = 0
    for (const url of urls) {
      let relay = relays[index]
      if (!relay || relay.url !== url) {
        relay = relayInit(url)
        relayActions.addRelay(relay)
      } else {
        console.log('Already connected to relay: ', url)
        return
      }
      await relay.connect()
      relay.on('connect', () => {
        console.log(`connected to ${relay.url}`)
      })
      relay.on('error', () => {
        console.log(`failed to connect to ${relay.url}`)
      })

      initialSubscriptions.forEach((subscription) => {
        const sub = relay.sub([subscription])
        sub.on('event', (event: any) => {
          handleEvent(event, chatActions)
        })
      })

      index += 1
    }
  }

  return {
    relays,
    connect,
  }
}
