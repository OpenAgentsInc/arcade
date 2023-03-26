import { relayInit } from 'nostr-tools'
import { useEffect, useState } from 'react'

const relayUrl = 'wss://relay.damus.io'
// const relayUrl = 'wss://arc1.arcadelabs.co'

export function useMessageSatsZapped(eventId: string) {
  const [msats, setMsats] = useState(0)

  const grabSats = async () => {
    const relay = relayInit(relayUrl)
    relay.on('connect', () => {
      console.log(`connected to ${relay.url}`)
    })
    relay.on('error', () => {
      console.log(`failed to connect to ${relay.url}`)
    })

    await relay.connect()
    console.log('connected')

    let events = await relay.list([
      {
        kinds: [9735],
        // since 5 minutes ago - as seconds timestamp
        // since: Math.floor(Date.now() / 1000) - 60 * 5,
        '#e': [eventId],
      },
    ])
    // console.log(events)

    for (let i = 0; i < events.length; i++) {
      const tagsArray = events[i].tags

      for (let j = 0; j < tagsArray.length; j++) {
        // console.log(tagsArray[j])

        // if tagsArray[0] is "description", then console.log JSON.parse of tagsArray[1]
        if (tagsArray[j][0] === 'description') {
          console.log('?!')
          const myObject = JSON.parse(tagsArray[j][1])
          //   console.log(JSON.parse(tagsArray[j][1]))

          let amount
          for (let i = 0; i < myObject.tags.length; i++) {
            if (myObject.tags[i][0] === 'amount') {
              amount = myObject.tags[i][1]
              break
            }
          }
          console.log(amount)
          setMsats((prevMsats) => parseInt(prevMsats) + parseInt(amount))
        }
      }

      console.log('------')
    }
  }
  useEffect(() => {
    grabSats()
  }, [])
  return msats / 1000
}
