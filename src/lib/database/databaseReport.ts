import * as SQLite from 'expo-sqlite'

export const databaseReport = async (db: SQLite.WebSQLDatabase) => {
  const tableCounts: { [table: string]: number } = {}
  return new Promise((resolve, reject) => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT name from sqlite_master WHERE type = "table"',
          [],
          (_, { rows: { _array } }) => {
            const tables = _array.map((t) => t.name)
            tables.forEach((table) => {
              tx.executeSql(
                `SELECT COUNT(*) as count FROM ${table}`,
                [],
                (_, { rows: { _array } }) => {
                  const count = _array[0].count
                  console.log(` ${count} records in ${table}`)
                  tableCounts[table] = count
                  if (Object.keys(tableCounts).length === tables.length) {
                    resolve(tableCounts)
                  }
                },
                (_, error) => {
                  console.log(`Error querying ${table}`, error)
                  reject(error)
                  return false
                }
              )
            })
          },
          (_, error) => {
            console.log('Error querying sqlite_master', error)
            reject(error)
            return false
          }
        )
      })
    } catch (error) {
      console.log('Error in databaseReport', error)
      reject(error)
    }
  })
}
