import { db } from 'lib/database'

export const setLastFetch = (type: string, timestamp: number) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT OR REPLACE INTO last_fetch (type, last_fetch) VALUES (?, ?)`,
      [type, timestamp],
      (_, result) => {},
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
        `SELECT last_fetch FROM last_fetch WHERE type = ?`,
        [type],
        (_, result) => {
          if (result.rows.length > 0) {
            resolve(result.rows.item(0).last_fetch)
          } else {
            resolve(undefined)
          }
        },
        (_, error) => {
          console.log('Error getting last fetch timestamp:', error)
          resolve(undefined)
          return false
        }
      )
    })
  })
}
