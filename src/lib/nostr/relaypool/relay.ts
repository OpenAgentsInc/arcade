// @ts-nocheck
/* global WebSocket */

import {
    Event, Filter, matchFilters, type, validateEvent, verifySignature
} from 'nostr-tools'

type RelayEvent = 'connect' | 'disconnect' | 'error' | 'notice'

export type Relay = {
  url: string
  status: number
  connect: () => Promise<void>
  close: () => Promise<void>
  sub: (filters: Filter[], opts?: SubscriptionOptions) => Sub
  publish: (event: Event) => Pub
  on: (type: RelayEvent, cb: any) => void
  off: (type: RelayEvent, cb: any) => void
}
export type Pub = {
  on: (type: 'ok' | 'seen' | 'failed', cb: any) => void
  off: (type: 'ok' | 'seen' | 'failed', cb: any) => void
}
export type Sub = {
  sub: (filters: Filter[], opts: SubscriptionOptions) => Sub
  unsub: () => void
  on: (type: 'event' | 'eose', cb: any) => void
  off: (type: 'event' | 'eose', cb: any) => void
}

type SubscriptionOptions = {
  skipVerification?: boolean
  id?: string
}

export function relayInit(url: string): Relay {
  let ws: WebSocket
  let resolveClose: () => void
  let connected = false
  let sendOnConnect: string[] = []
  const openSubs: {
    [id: string]: { filters: Filter[] } & SubscriptionOptions
  } = {}
  const listeners: {
    connect: (() => void)[]
    disconnect: (() => void)[]
    error: (() => void)[]
    notice: ((msg: string) => void)[]
  } = {
    connect: [],
    disconnect: [],
    error: [],
    notice: [],
  }
  const subListeners: {
    [subid: string]: {
      event: ((event: Event) => void)[]
      eose: (() => void)[]
    }
  } = {}
  const pubListeners: {
    [eventid: string]: {
      ok: (() => void)[]
      seen: (() => void)[]
      failed: ((reason: string) => void)[]
    }
  } = {}

  async function connectRelay(): Promise<void> {
    return new Promise((resolve, reject) => {
      ws = new WebSocket(url)

      ws.onopen = () => {
        connected = true
        for (const subid in openSubs) {
          trySend(['REQ', subid, ...openSubs[subid].filters])
        }
        for (const msg of sendOnConnect) {
          ws.send(msg)
        }
        sendOnConnect = []

        listeners.connect.forEach((cb) => cb())
        resolve()
      }
      ws.onerror = () => {
        listeners.error.forEach((cb) => cb())
        reject()
      }
      ws.onclose = async () => {
        connected = false
        listeners.disconnect.forEach((cb) => cb())
        resolveClose && resolveClose()
      }

      ws.onmessage = async (e) => {
        let data
        try {
          data = JSON.parse(e.data)
        } catch (err) {
          data = e.data
        }

        if (data.length >= 1) {
          switch (data[0]) {
            case 'EVENT':
              if (data.length !== 3) return // ignore empty or malformed EVENT

              const id = data[1]
              const event = data[2]
              if (
                validateEvent(event) &&
                openSubs[id] &&
                (openSubs[id].skipVerification || verifySignature(event)) &&
                matchFilters(openSubs[id].filters, event)
              ) {
                openSubs[id]
                ;(subListeners[id]?.event || []).forEach((cb) => cb(event))
              }
              return
            case 'EOSE': {
              if (data.length !== 2) return // ignore empty or malformed EOSE
              const id = data[1]
              ;(subListeners[id]?.eose || []).forEach((cb) => cb())
              return
            }
            case 'OK': {
              if (data.length < 3) return // ignore empty or malformed OK
              const id: string = data[1]
              const ok: boolean = data[2]
              const reason: string = data[3] || ''
              if (ok) pubListeners[id]?.ok.forEach((cb) => cb())
              else pubListeners[id]?.failed.forEach((cb) => cb(reason))
              return
            }
            case 'NOTICE':
              if (data.length !== 2) return // ignore empty or malformed NOTICE
              const notice = data[1]
              listeners.notice.forEach((cb) => cb(notice))
          }
        }
      }
    })
  }

  async function connect(): Promise<void> {
    if (ws?.readyState && ws.readyState === 1) return // ws already open
    await connectRelay()
  }

  async function trySend(params: [string, ...any]) {
    const msg = JSON.stringify(params)

    if (connected) {
      ws.send(msg)
    } else {
      sendOnConnect.push(msg)
    }
  }

  const sub = (
    filters: Filter[],
    {
      skipVerification = false,
      id = Math.random().toString().slice(2),
    }: SubscriptionOptions = {}
  ): Sub => {
    const subid = id

    openSubs[subid] = {
      id: subid,
      filters,
      skipVerification,
    }
    if (connected) {
      trySend(['REQ', subid, ...filters])
    }

    return {
      sub: (newFilters, newOpts = {}) =>
        sub(newFilters || filters, {
          skipVerification: newOpts.skipVerification || skipVerification,
          id: subid,
        }),
      unsub: () => {
        delete openSubs[subid]
        delete subListeners[subid]
        if (connected) {
          trySend(['CLOSE', subid])
        }
      },
      on: (type: 'event' | 'eose', cb: any): void => {
        subListeners[subid] = subListeners[subid] || {
          event: [],
          eose: [],
        }
        subListeners[subid][type].push(cb)
      },
      off: (type: 'event' | 'eose', cb: any): void => {
        const listeners = subListeners[subid]
        const idx = listeners[type].indexOf(cb)
        if (idx >= 0) listeners[type].splice(idx, 1)
      },
    }
  }

  return {
    url,
    sub,
    on: (type: RelayEvent, cb: any): void => {
      listeners[type].push(cb)
      if (type === 'connect' && ws?.readyState === 1) {
        cb()
      }
    },
    off: (type: RelayEvent, cb: any): void => {
      const index = listeners[type].indexOf(cb)
      if (index !== -1) listeners[type].splice(index, 1)
    },
    publish(event: Event): Pub {
      if (!event.id) throw new Error(`event ${event} has no id`)
      const id = event.id

      let sent = false
      let mustMonitor = false

      trySend(['EVENT', event])
        .then(() => {
          sent = true
          if (mustMonitor) {
            startMonitoring()
            mustMonitor = false
          }
        })
        .catch(() => {})

      const startMonitoring = () => {
        const monitor = sub([{ ids: [id] }], {
          id: `monitor-${id.slice(0, 5)}`,
        })
        const willUnsub = setTimeout(() => {
          ;(pubListeners[id]?.failed || []).forEach((cb) =>
            cb('event not seen after 5 seconds')
          )
          monitor.unsub()
        }, 5000)
        monitor.on('event', () => {
          clearTimeout(willUnsub)
          ;(pubListeners[id]?.seen || []).forEach((cb) => cb())
        })
      }

      return {
        on: (type: 'ok' | 'seen' | 'failed', cb: any) => {
          pubListeners[id] = pubListeners[id] || {
            ok: [],
            seen: [],
            failed: [],
          }
          pubListeners[id][type].push(cb)

          if (type === 'seen') {
            if (sent) startMonitoring()
            else mustMonitor = true
          }
        },
        off: (type: 'ok' | 'seen' | 'failed', cb: any) => {
          const listeners = pubListeners[id]
          if (!listeners) return
          const idx = listeners[type].indexOf(cb)
          if (idx >= 0) listeners[type].splice(idx, 1)
        },
      }
    },
    connect,
    close(): Promise<void> {
      ws.close()
      return new Promise<void>((resolve) => {
        resolveClose = resolve
      })
    },
    get status() {
      return ws?.readyState ?? 3
    },
  }
}
