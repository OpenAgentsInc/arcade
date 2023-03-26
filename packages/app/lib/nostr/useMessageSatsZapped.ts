import { relayInit } from 'nostr-tools'
import { useEffect, useState } from 'react'

const relayUrl = 'wss://relay.damus.io'

export function useMessageSatsZapped(eventId: string) {
  const [msats, setMsats] = useState(0)

  useEffect(() => {
    const relay = relayInit(relayUrl)

    const processEvent = (event) => {
      const tagsArray = event.tags

      for (let j = 0; j < tagsArray.length; j++) {
        if (tagsArray[j][0] === 'description') {
          const myObject = JSON.parse(tagsArray[j][1])
          let amount
          for (let i = 0; i < myObject.tags.length; i++) {
            if (myObject.tags[i][0] === 'amount') {
              amount = myObject.tags[i][1]
              break
            }
          }
          setMsats((prevMsats) => prevMsats + parseInt(amount))
        }
      }
    }

    const subscribeToEvents = async () => {
      await relay.connect()

      const sub = relay.sub([
        {
          kinds: [9735],
          '#e': [eventId],
        },
      ])

      sub.on('event', processEvent)
    }

    subscribeToEvents()

    return () => {
      relay.close()
    }
  }, [])

  return msats / 1000
}
