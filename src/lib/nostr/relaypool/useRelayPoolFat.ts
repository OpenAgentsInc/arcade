import { Event, Filter, Kind, Sub } from 'nostr-tools'
import { useEffect, useState } from 'react'

import { mergeSimilarAndRemoveEmptyFilters } from './merge-similar-filters'
import { type Relay, relayInit } from './relay'

const unique = (arr: string[]) => [...new Set(arr)]

function withoutRelay(filter: Filter & { relay?: string }): Filter {
  filter = { ...filter }
  delete filter.relay
  return filter
}

type Cache = {
  eventsById: Map<string, Event & { id: string }>
  metadataByPubKey: Map<string, Event & { id: string }>
  contactsByPubKey: Map<string, Event & { id: string }>
}

export function useRelayPool(
  relays?: string[],
  options: { noCache?: boolean } = {}
) {
  const [relayByUrl, setRelayByUrl] = useState(new Map())
  const [noticecbs, setNoticeCbs] = useState([])
  const [cache, setCache] = useState(
    options.noCache
      ? undefined
      : {
          eventsById: new Map(),
          metadataByPubKey: new Map(),
          contactsByPubKey: new Map(),
        }
  )
  useEffect(() => {
    if (relays) {
      for (const relay of unique(relays)) {
        addOrGetRelay(relay)
      }
    }
  }, [relays])

  function addOrGetRelay(relay: string): Relay {
    let relayInstance = relayByUrl.get(relay)
    if (relayInstance) {
      return relayInstance
    }
    relayInstance = relayInit(relay)
    setRelayByUrl(relayByUrl.set(relay, relayInstance))
    relayInstance.connect().then(
      (onfulfilled) => {
        relayInstance?.on('notice', (msg: string) => {
          noticecbs.forEach((cb) => cb(relay + ': ' + msg))
        })
      },
      (onrejected) => {
        console.warn('failed to connect to relay ' + relay)
      }
    )
    return relayInstance
  }

  function close() {
    for (const relayInstance of relayByUrl.values()) {
      relayInstance.close()
    }
    setRelayByUrl(new Map())
  }

  function getCachedEventsByIdWithUpdatedFilter(
    filter: Filter & { relay?: string; noCache?: boolean; ids: string[] }
  ): {
    filter: Filter & { relay?: string }
    events: Set<Event & { id: string }>
  } {
    const events = new Set<Event & { id: string }>()
    const ids: string[] = []
    for (const id of filter.ids) {
      const event = cache?.eventsById.get(id)
      if (event) {
        events.add(event)
      } else {
        ids.push(id)
      }
    }
    return { filter: { ...filter, ids }, events }
  }
  // similar function for getCachedEventsByPubKeyWithUpdatedFilter
  return {
    relayByUrl,
    close,
    addOrGetRelay,
    getCachedEventsByIdWithUpdatedFilter,
    addNoticeCb,
    removeNoticeCb,
  }
}
