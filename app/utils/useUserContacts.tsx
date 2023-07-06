import { NostrPool } from "app/arclib/src"
import { ContactManager } from "app/arclib/src/contacts"
import { ChannelManager } from "app/arclib/src/channels"
import { RelayContext } from "app/components"
import { useStores } from "app/models"
import { useContext, useEffect } from "react"

type PoolWithContacts = NostrPool & { __contacts?: ContactManager }
type PoolWithChannels = NostrPool & { __channels?: ChannelManager }

export function useUserContacts() {
  const mgr = useContactManager()

  const {
    userStore: { getContacts, fetchContacts },
  } = useStores()

  useEffect(() => {
    fetchContacts(mgr)
  }, [fetchContacts])

  return getContacts
}

export function useContactManager() {
  const pool = useContext(RelayContext) as PoolWithContacts
  if (!pool.__contacts) {
    pool.__contacts = new ContactManager(pool)
  }
  const mgr = pool.__contacts
  return mgr
}

export function useChannelManager() {
  const pool = useContext(RelayContext) as PoolWithChannels
  if (!pool.__channels) {
    pool.__channels = new ChannelManager(pool)
  }
  const mgr = pool.__channels
  return mgr
}
