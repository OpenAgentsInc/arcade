import { useDatabase } from 'lib/database'
import { useEffect, useState } from 'react'

import { Kind } from '../nostr'
import { useInterval } from './useInterval'

export const useGlobalFeed = () => {
  const db = useDatabase()
  const [notes, setNotes] = useState<any[]>([])

  const fetchNotes = () => {
    console.log('Fetching notes.')
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM arc_notes WHERE kind = ? ORDER BY created_at DESC',
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
  }

  useEffect(() => {
    fetchNotes()
  }, [db])
  useInterval(fetchNotes, 10000)

  return notes
}
