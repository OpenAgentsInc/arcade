import { db } from 'lib/database'

export const setLastFetch = (type: string, timestamp: number) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT OR REPLACE INTO last_fetch (type, timestamp) VALUES (?, ?)`,
      [type, timestamp],
      (_, result) => {
        console.log('Last fetch timestamp set:', result)
      },
      (_, error) => {
        console.log('Error setting last fetch timestamp:', error)
        return false
      }
    )
  })
}

export const getLastFetch = (type: string) => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT timestamp FROM last_fetch WHERE type = ?`,
        [type],
        (_, result) => {
          if (result.rows.length > 0) {
            resolve(result.rows.item(0).timestamp)
          } else {
            resolve(null)
          }
        },
        (_, error) => {
          console.log('Error getting last fetch timestamp:', error)
          resolve(null)
          return false
        }
      )
    })
  })
}
