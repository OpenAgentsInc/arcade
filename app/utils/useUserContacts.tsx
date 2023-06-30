import { NostrPool } from "app/arclib/src"
import { ContactManager } from "app/arclib/src/contacts"
import { RelayContext } from "app/components"
import { useStores } from "app/models"
import { useContext, useEffect } from "react"

type PoolWithContacts = NostrPool & { __contacts?: ContactManager }

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
