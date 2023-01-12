import { useDatabase } from 'lib/database'
import { useEffect, useState } from 'react'

export const useUserMetadata = (pubkey: string) => {
  const db = useDatabase()
  const [metadata, setMetadata] = useState(null)

  useEffect(() => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM arc_users WHERE id = ?`,
          [pubkey],
          (_, { rows: { _array } }) => {
            setMetadata(_array[0])
          },
          (_, error) => {
            console.log(error)
            return false
          }
        )
      })
    } catch (e) {
      console.log('error fetching user metadata', e)
    }
  }, [db, pubkey])

  return metadata
}
