import { Asset } from 'expo-asset'
import * as FileSystem from 'expo-file-system'
import * as SQLite from 'expo-sqlite'

const dbname = 'arc.db'
const databasePath = `${FileSystem.documentDirectory}SQLite/${dbname}`

export class Database {
  private database: SQLite.WebSQLDatabase

  constructor() {
    this.openDatabase()
      .then((db) => {
        this.database = db
        this.createTables()
        console.log('Database tables created maybe')
      })
      .catch((error) => {
        console.error('Error opening database', error)
      })
  }

  async openDatabase(): Promise<SQLite.WebSQLDatabase> {
    try {
      const db = SQLite.openDatabase(dbname)
      return db
      //   // Check if the SQLite directory exists in the document directory
      //   const directoryInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')
      //   if (!directoryInfo.exists) {
      //     // If it doesn't exist, create the directory
      //     await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite')
      //   }

      //   // Check if the database file already exists in the directory
      //   const fileInfo = await FileSystem.getInfoAsync(databasePath)
      //   if (!fileInfo.exists) {
      //     // If it doesn't exist, download the file from the provided path
      //     const asset = Asset.fromModule(await import(databasePath))
      //     await FileSystem.downloadAsync(asset.uri, databasePath)
      //   }

      //   // Open the database
      //   return SQLite.openDatabase(dbname)
    } catch (error) {
      console.error('Error opening database', error)
      return Promise.reject(error)
    }
  }

  private createTables() {
    console.log('Creating tables...')
    this.database.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS arc_notes(
          id TEXT PRIMARY KEY NOT NULL,
          content TEXT NOT NULL,
          created_at INT NOT NULL,
          kind INT NOT NULL,
          pubkey TEXT NOT NULL,
          sig TEXT NOT NULL,
          tags TEXT NOT NULL,
          main_event_id TEXT,
          reply_event_id TEXT,
          user_mentioned BOOLEAN DEFAULT FALSE,
          seen BOOLEAN DEFAULT FALSE
        );`
        )
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS arc_users(
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT,
          picture TEXT,
          about TEXT,
          main_relay TEXT,
          contact BOOLEAN DEFAULT FALSE,
          follower BOOLEAN DEFAULT FALSE,
          lnurl TEXT,
          created_at INT DEFAULT 0
        );`
        )
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS arc_relays(
          url TEXT PRIMARY KEY NOT NULL,
          pet INTEGER
        );`
        )
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS arc_direct_messages(
          id TEXT PRIMARY KEY NOT NULL,
          content TEXT NOT NULL,
          created_at INT NOT NULL,
          kind INT NOT NULL,
          pubkey TEXT NOT NULL,
          sig TEXT NOT NULL,
          tags TEXT NOT NULL,
          conversation_id TEXT NOT NULL,
          read BOOLEAN DEFAULT FALSE
          );`
        )
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS arc_reactions(
            id TEXT PRIMARY KEY NOT NULL,
            content TEXT NOT NULL,
            created_at INT NOT NULL,
            kind INT NOT NULL,
            pubkey TEXT NOT NULL,
            sig TEXT NOT NULL,
            tags TEXT NOT NULL,
            event_id TEXT NOT NULL,
            type INT NOT NULL
          );`
        )
      },
      (error) => {
        console.error('Error creating tables', error)
      },
      () => {
        console.log('Success creating tables')
      }
    )
  }

  close() {
    this.database.closeAsync()
  }
}
