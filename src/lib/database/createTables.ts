import * as SQLite from 'expo-sqlite'

export const createTables = async (db: SQLite.WebSQLDatabase) => {
  try {
    db.transaction(async (tx) => {
      for (const createTableCall of createTableCalls) {
        tx.executeSql(createTableCall)
      }
      console.log('Database initialized.')
    })
  } catch (error) {
    console.error('Error creating tables', error)
  }
}

const createTableCalls = [
  `CREATE TABLE IF NOT EXISTS arc_channels(
    id TEXT PRIMARY KEY NOT NULL,
    pubkey TEXT NOT NULL,
    sig TEXT NOT NULL,
    name TEXT NOT NULL,
    about TEXT NOT NULL,
    picture TEXT NOT NULL,
    created_at INT NOT NULL
  );`,
  `CREATE TABLE IF NOT EXISTS arc_channel_messages(
    id TEXT PRIMARY KEY NOT NULL,
    content TEXT NOT NULL,
    created_at INT NOT NULL,
    kind INT NOT NULL,
    pubkey TEXT NOT NULL,
    sig TEXT NOT NULL,
    tags TEXT NOT NULL,
    channel_id TEXT NOT NULL,
    reply_event_id TEXT
  );`,
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
  );`,
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
  );`,
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
  );`,
  `CREATE TABLE IF NOT EXISTS arc_relays(
    url TEXT PRIMARY KEY NOT NULL,
    pet INTEGER
  );`,
  `CREATE TABLE IF NOT EXISTS arc_users(
    id TEXT PRIMARY KEY NOT NULL,
    pubkey TEXT NOT NULL,
    name TEXT,
    picture TEXT,
    about TEXT,
    main_relay TEXT,
    contact BOOLEAN DEFAULT FALSE,
    follower BOOLEAN DEFAULT FALSE,
    lnurl TEXT,
    created_at INT DEFAULT 0
  );`,
  `CREATE TABLE IF NOT EXISTS last_fetch (
    type TEXT PRIMARY KEY NOT NULL UNIQUE,
    last_fetch INT NOT NULL
  );`,
]
