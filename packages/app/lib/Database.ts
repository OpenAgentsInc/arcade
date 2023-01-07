import { Channel } from 'app/stores/chat'
import * as SQLite from 'expo-sqlite'
import { Kind } from 'nostr-tools'

const dbname = 'arc3.db'

export class Database {
  public database: SQLite.WebSQLDatabase

  constructor() {
    this.openDatabase()
      .then((db) => {
        this.database = db
        this.createTables()
      })
      .catch((error) => {
        console.error('Error opening database', error)
      })
  }

  async openDatabase(): Promise<SQLite.WebSQLDatabase> {
    try {
      const db = SQLite.openDatabase(dbname)
      return db
    } catch (error) {
      console.error('Error opening database', error)
      return Promise.reject(error)
    }
  }

  async getNumberOfRows(tabletype: string = 'channels'): Promise<number> {
    return new Promise((resolve, reject) => {
      this.database.transaction(
        (tx) => {
          tx.executeSql(`SELECT COUNT(*) as count FROM arc_${tabletype}`, [], (_, { rows }) => {
            const count = rows._array[0].count
            resolve(count)
          })
        },
        (error) => {
          console.error('Error counting notes', error)
          reject(error)
        }
      )
    })
  }

  private createTables() {
    this.database.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS arc_channels(
              id TEXT PRIMARY KEY NOT NULL,
              pubkey TEXT NOT NULL,
              sig TEXT NOT NULL,
              name TEXT NOT NULL,
              about TEXT NOT NULL,
              picture TEXT NOT NULL,
              created_at INT NOT NULL
            );`
        )
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

  public async getChannels(): Promise<Channel[]> {
    return new Promise((resolve, reject) => {
      this.database.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM arc_channels',
          [],
          (_, result) => {
            console.log('result', result)
            const channels: Channel[] = []
            for (let i = 0; i < result.rows.length; i++) {
              const row = result.rows.item(i)
              const channel: Channel = {
                id: row.id,
                kind: Kind.ChannelCreation,
                pubkey: row.pubkey,
                sig: row.sig,
                metadata: {
                  name: row.name,
                  about: row.about,
                  picture: row.picture,
                },
                tags: [],
                timestamp: row.timestamp,
              }
              channels.push(channel)
            }
            resolve(channels)
          },
          (_, error: SQLite.SQLError) => {
            console.error('Error getting channels from database', error)
            return false
          }
        )
      })
    })
  }

  close() {
    this.database.closeAsync()
  }
}
