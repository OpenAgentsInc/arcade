import { relayInit } from 'nostr-tools'
import { useEffect, useState } from 'react'

const relayUrl = 'wss://relay.damus.io'

export function useMessageSatsZapped(eventId: string) {
  const [msats, setMsats] = useState(0)

  const grabSats = async () => {
    const relay = relayInit(relayUrl)
    await relay.connect()
    let events: any = await relay.list([
      {
        kinds: [9735],
        '#e': [eventId],
      },
    ])

    for (let i = 0; i < events.length; i++) {
      const tagsArray = events[i].tags

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
  }
  useEffect(() => {
    grabSats()
  }, [])
  return msats / 1000
}
