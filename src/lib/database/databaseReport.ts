import * as SQLite from 'expo-sqlite'

export const databaseReport = (db: SQLite.WebSQLDatabase) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table'",
        [],
        (_, { rows }) => {
          for (let i = 0; i < rows.length; i++) {
            const table = rows.item(i)
            const tableName = table.name

            tx.executeSql(
              `SELECT COUNT(*) as count FROM ${tableName}`,
              [],
              (_, { rows }) => {
                const count = rows.item(0).count
                console.log(`${count} records in ${tableName}`)
              }
            )
          }
        }
      )
    })
  } catch (error) {
    console.log('Error in databaseReport: ', error)
  }
}
