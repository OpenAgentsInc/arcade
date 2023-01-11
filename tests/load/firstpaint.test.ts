import 'websocket-polyfill'

import { Nostr } from 'lib/nostr'
import { delay } from 'lib/utils'

describe('Nostr', () => {
  let nostr: Nostr

  beforeEach(() => {
    nostr = new Nostr()
  })

  afterEach(async () => {
    await delay(1000)
    nostr.close()
  })

  it('should call loadFirstPaint and expect it to be true', () => {
    expect(nostr.loadFirstPaint()).toBe(true)
  })
})
