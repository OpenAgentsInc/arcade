import { NostrPool } from "app/arclib/src"
import { RelayContext } from "app/components"
import { useStores } from "app/models"
import { useContext, useEffect } from "react"

export function useUserContacts() {
  const pool = useContext(RelayContext) as NostrPool

  const {
    userStore: { getContacts, fetchContacts },
  } = useStores()

  useEffect(() => {
    fetchContacts(pool)
  }, [fetchContacts])

  return getContacts
}
