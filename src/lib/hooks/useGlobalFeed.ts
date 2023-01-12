import { useDatabase } from 'lib/database'
import { useEffect, useState } from 'react'

import { Kind } from '../nostr'

export const useGlobalFeed = () => {
  const db = useDatabase()
  const [notes, setNotes] = useState<any[]>([])

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM arc_notes WHERE kind = ?',
        [Kind.Text],
        (_, { rows: { _array } }) => {
          setNotes(_array)
        },
        (_, error) => {
          console.log(error)
          return false
        }
      )
    })
  }, [db])

  return notes
}
