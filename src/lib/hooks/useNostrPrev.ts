import { useStore } from 'app/stores'
import { useEffect } from 'react'

import { Nostr } from '../nostr'

export const useNostr = () => {
  const nostr = useStore((s) => s.nostr)

  // If nostr is undefined, create new Nostr object. Do it only once.
  useEffect(() => {
    if (!nostr) {
      const newNostr = new Nostr()
      useStore.setState({ nostr: newNostr })
    }
  }, [nostr])

  return nostr
}
