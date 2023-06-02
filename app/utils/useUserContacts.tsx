import { RelayContext } from "app/components"
import { useStores } from "app/models"
import { useContext, useEffect } from "react"

export function useUserContacts() {
  const pool: any = useContext(RelayContext)

  const {
    userStore: { contacts, fetchContacts },
  } = useStores()

  useEffect(() => {
    fetchContacts(pool)
  }, [fetchContacts])

  return contacts
}
