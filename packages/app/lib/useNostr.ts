import { useStore } from 'app/stores'
import { relayInit } from 'nostr-tools'
import { useReducer } from 'react'
import { handleEvent } from './handleEvent'

const initialState = {
  relays: [] as any[],
}

type State = typeof initialState

enum ActionType {
  Connect,
}

type Action = {
  type: ActionType.Connect
  payload: string[]
}

const reducer = async (state: State, action: Action): Promise<State> => {
  switch (action.type) {
    case ActionType.Connect: {
      const { payload } = action
      let index = 0
      const newRelays = []
      for (const url of payload) {
        let relay = state.relays[index]
        if (!relay || relay.url !== url) {
          relay = relayInit(url)
          newRelays.push(relay)
        }
        await relay.connect()
        relay.on('connect', () => {
          console.log(`connected to ${relay.url}`)
        })
        relay.on('error', () => {
          console.log(`failed to connect to ${relay.url}`)
        })

        subscriptions.forEach((subscription) => {
          const sub = relay.sub([subscription])
          sub.on('event', (event: any) => {
            handleEvent(event, actions)
          })
        })

        index += 1
      }

      return {
        ...state,
        relays: newRelays,
      }
    }
  }
}

export const useNostr = () => {
  const actions = useStore((s) => s.actions)
  const [state, dispatch] = useReducer(reducer, initialState)
  const connect = async (urls: string[]) => {
    dispatch({
      type: ActionType.Connect,
      payload: urls,
    })
  }

  console.log('Relays:', state.relays)
  return {
    relays: state.relays,
    connect,
  }
}

const subscriptions = [
  // Subscribe to the Nostr channel
  {
    kinds: [40],
    limit: 1,
    ids: ['25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb'],
  },
  // Subscribe to 10 other channels
  { kinds: [40], limit: 10 },
  // Subscribe to messages and grab 35
  { kinds: [42], limit: 35 },
]
