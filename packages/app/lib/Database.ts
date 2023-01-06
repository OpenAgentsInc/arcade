import * as SQLite from 'expo-sqlite'

export class Database {
  private database: SQLite.Database

  constructor(absoluteFilesPath: string) {
    this.database = SQLite.openDatabase(
      `${absoluteFilesPath}/arc.sqlite`,
      undefined,
      undefined,
      undefined,
      (db: SQLite.Database) => {
        console.log('Opened database')
      }
    )

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
          reply_event_id TEXT
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
          follower BOOLEAN DEFAULT FALSE
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
        // Add the rest of the executeSql calls here
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
}
