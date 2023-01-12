import { Event, Filter, Kind, Sub } from 'nostr-tools'
import { useStore } from 'stores'

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
export class RelayPool {
  relayByUrl: Map<string, Relay>
  noticecbs: ((msg: string) => void)[]
  cache?: Cache
  constructor(relays?: string[], options: { noCache?: boolean } = {}) {
    console.log(`RelayPool constructed with ${relays?.length} relays.`)
    if (!options.noCache) {
      this.cache = {
        eventsById: new Map(),
        metadataByPubKey: new Map(),
        contactsByPubKey: new Map(),
      }
    }
    this.relayByUrl = new Map()
    this.noticecbs = []
    if (relays) {
      for (const relay of unique(relays)) {
        this.addOrGetRelay(relay)
      }
    }
  }
  addOrGetRelay(relay: string): Relay {
    const store = useStore.getState()
    let relayInstance = this.relayByUrl.get(relay)
    if (relayInstance) {
      return relayInstance
    }
    store.relayActions.addOrModifyRelay({
      url: relay,
      status: 'connecting',
      connected: false,
    })
    relayInstance = relayInit(relay)
    this.relayByUrl.set(relay, relayInstance)
    relayInstance.connect().then(
      (onfulfilled) => {
        store.relayActions.addOrModifyRelay({
          url: relay,
          status: 'connected',
          connected: true,
        })
        relayInstance?.on('notice', (msg: string) => {
          this.noticecbs.forEach((cb) => cb(relay + ': ' + msg))
        })
      },
      (onrejected) => {
        console.warn('failed to connect to relay ' + relay)
        store.relayActions.addOrModifyRelay({
          url: relay,
          status: 'disconnected',
          connected: false,
        })
      }
    )
    return relayInstance
  }

  closeRelay(url: string) {
    console.log('Closing relay: ' + url)
    const relayInstance = this.relayByUrl.get(url)
    // console.log('we got relayInstance?', relayInstance)
    if (!relayInstance) return
    useStore.getState().relayActions.addOrModifyRelay({
      url,
      status: 'closed',
      connected: false,
    })

    relayInstance.close()

    this.relayByUrl.delete(url)
  }

  close() {
    for (const relayInstance of this.relayByUrl.values()) {
      relayInstance.close()
      useStore.getState().relayActions.addOrModifyRelay({
        url: relayInstance.url,
        status: 'closed',
        connected: false,
      })
      relayInstance?.on('notice', (msg: string) => {
        this.noticecbs.forEach((cb) => cb(relayInstance.url + ': ' + msg))
      })
    }
    this.relayByUrl.clear()
  }

  private getCachedEventsByIdWithUpdatedFilter(
    filter: Filter & { relay?: string; noCache?: boolean; ids: string[] }
  ): {
    filter: Filter & { relay?: string }
    events: Set<Event & { id: string }>
  } {
    const events = new Set<Event & { id: string }>()
    const ids: string[] = []
    for (const id of filter.ids) {
      const event = this.cache?.eventsById.get(id)
      if (event) {
        events.add(event)
      } else {
        ids.push(id)
      }
    }
    return { filter: { ...filter, ids }, events }
  }

  private getCachedEventsByPubKeyWithUpdatedFilter(
    filter: Filter & {
      relay?: string
      noCache?: boolean
      authors: string[]
      kinds: Kind[]
    }
  ): {
    filter: Filter & { relay?: string }
    events: Set<Event & { id: string }>
  } {
    const authors: string[] = []
    const events = new Set<Event & { id: string }>()
    for (const author of filter.authors) {
      let contactEvent
      if (filter.kinds.find((kind) => kind === Kind.Contacts)) {
        contactEvent = this.cache?.contactsByPubKey.get(author)
        if (!contactEvent) {
          authors.push(author)
          continue
        }
      }
      let metadataEvent
      if (filter.kinds.find((kind) => kind === Kind.Metadata)) {
        const metadataEvent = this.cache?.metadataByPubKey.get(author)
        if (!metadataEvent) {
          authors.push(author)
          continue
        }
      }
      if (contactEvent) {
        events.add(contactEvent)
      }
      if (metadataEvent) {
        events.add(metadataEvent)
      }
    }
    return { filter: { ...filter, authors }, events }
  }

  getCachedEventsWithUpdatedFilters(
    filters: (Filter & { relay?: string; noCache?: boolean })[],
    relays: string[]
  ): {
    filters: (Filter & { relay?: string })[]
    events: (Event & { id: string })[]
  } {
    if (!this.cache) {
      return { filters, events: [] }
    }
    const events: Set<Event & { id: string }> = new Set()
    const new_filters: (Filter & { relay?: string })[] = []
    for (const filter of filters) {
      let new_data = { filter, events: [] }
      if (filter.ids) {
        // @ts-ignore
        new_data = this.getCachedEventsByIdWithUpdatedFilter(filter)
      } else if (
        !filter.noCache &&
        filter.authors &&
        filter.kinds &&
        !filter.kinds.find(
          (kind) => kind !== Kind.Contacts && kind !== Kind.Metadata
        )
      ) {
        // @ts-ignore
        new_data = this.getCachedEventsByPubKeyWithUpdatedFilter(filter)
      }
      for (const event of new_data.events) {
        events.add(event)
      }
      new_filters.push(new_data.filter)
    }
    return { filters: new_filters, events: [...events] }
  }

  private getFiltersByRelay(
    filters: (Filter & { relay?: string })[],
    relays: string[]
  ): Map<string, Filter[]> {
    const filtersByRelay = new Map<string, Filter[]>()
    const filtersWithoutRelay: Filter[] = []
    for (const filter of filters) {
      const relay = filter.relay
      if (relay) {
        const relayFilters = filtersByRelay.get(relay)
        if (relayFilters) {
          relayFilters.push(withoutRelay(filter))
        } else {
          filtersByRelay.set(relay, [withoutRelay(filter)])
        }
      } else {
        filtersWithoutRelay.push(filter)
      }
    }
    if (filtersWithoutRelay.length > 0) {
      for (const relay of relays) {
        const filters = filtersByRelay.get(relay)
        if (filters) {
          filtersByRelay.set(relay, filters.concat(filtersWithoutRelay))
        } else {
          filtersByRelay.set(relay, filtersWithoutRelay)
        }
      }
    }
    return filtersByRelay
  }

  private addEventToCache(event: Event & { id: string }) {
    if (this.cache) {
      this.cache.eventsById.set(event.id, event)
      if (event.kind === Kind.Metadata) {
        this.cache.metadataByPubKey.set(event.pubkey, event)
      }
      if (event.kind === Kind.Contacts) {
        this.cache.contactsByPubKey.set(event.pubkey, event)
      }
    }
  }

  subscribe(
    filters: (Filter & { relay?: string })[],
    relays: string[],
    onEvent: (
      event: Event & { id: string },
      afterEose: boolean,
      url: string | undefined
    ) => void,
    onEose?: (
      eventsByThisSub: (Event & { id: string })[] | undefined,
      url: string
    ) => void
  ): () => void {
    const cachedEventsWithUpdatedFilters =
      this.getCachedEventsWithUpdatedFilters(filters, relays)

    for (const event of cachedEventsWithUpdatedFilters.events) {
      onEvent(event, false, undefined)
    }
    filters = cachedEventsWithUpdatedFilters.filters
    filters = mergeSimilarAndRemoveEmptyFilters(filters)
    relays = unique(relays)
    const filtersByRelay = this.getFiltersByRelay(filters, relays)

    const subs: Sub[] = []
    for (const [relay, filters] of filtersByRelay) {
      const mergedAndRemovedEmptyFilters =
        mergeSimilarAndRemoveEmptyFilters(filters)
      if (mergedAndRemovedEmptyFilters.length === 0) {
        continue
      }
      const instance = this.addOrGetRelay(relay)
      const sub = instance.sub(mergedAndRemovedEmptyFilters)
      subs.push(sub)
      let eventsBySub: (Event & { id: string })[] | undefined = []
      sub.on('event', (event: Event & { id: string }) => {
        console.log(`Received event kind ${event.kind} from ${relay}`)
        this.addEventToCache(event)
        eventsBySub?.push(event)
        onEvent(event, eventsBySub === undefined, relay)
      })
      if (onEose) {
        sub.on('eose', () => {
          onEose(eventsBySub, relay)
          eventsBySub = undefined
        })
      }
    }
    return () => {
      for (const sub of subs) {
        sub.unsub()
      }
    }
  }

  publish(event: Event, relays: string[]) {
    for (const relay of unique(relays)) {
      const instance = this.addOrGetRelay(relay)
      instance.publish(event)
    }
  }
  onnotice(cb: (msg: string) => void) {
    this.noticecbs.push(cb)
  }
  onerror(cb: (msg: string) => void) {
    this.relayByUrl.forEach((relay: Relay, url: string) =>
      relay.on('error', (msg: string) => cb(url + ': ' + msg))
    )
  }
  ondisconnect(cb: (msg: string) => void) {
    this.relayByUrl.forEach((relay: Relay, url: string) =>
      relay.on('disconnect', (msg: string) => cb(url + ': ' + msg))
    )
  }
}
