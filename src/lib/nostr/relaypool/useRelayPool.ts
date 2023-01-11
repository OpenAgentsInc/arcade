export const useRelayPool = (
  relays?: string[],
  options?: { noCache?: boolean }
): {
  relayByUrl: Map<string, Relay>
  noticecbs: ((msg: string) => void)[]
  cache?: Cache
  close: () => void
  getCachedEventsWithUpdatedFilters: (
    filters: (Filter & { relay?: string; noCache?: boolean })[],
    relays: string[]
  ) => {
    filters: (Filter & { relay?: string })[]
    events: (Event & { id: string })[]
  }
  subscribe: (
    filters: (Filter & { relay?: string })[],
    relays: string[],
    onEvent: (
      event: Event & { id: string },
      afterEose: boolean,
      url?: string
    ) => void,
    onEose?: (
      eventsByThisSub: (Event & { id: string })[] | undefined,
      url: string
    ) => void
  ) => () => void
  publish: (event: Event, relays: string[]) => void
  onnotice: (cb: (msg: string) => void) => void
  onerror: (cb: (msg: string) => void) => void
  ondisconnect: (cb: (msg: string) => void) => void
} => {
  const [relayPool] = useState(new RelayPool(relays, options))

  const close = () => {
    relayPool.close()
  }
  return {}
}
