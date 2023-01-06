import * as SQLite from 'expo-sqlite'

interface EventData {
  created_at: number
  content: string
  id: string
  kind: string
  pubkey: string
  sig: string
  tags: any[]
}

export class Event {
  created_at: number
  content: string
  id: string
  kind: string
  pubkey: string
  sig: string
  tags: any[]

  constructor(data: EventData) {
    this.created_at = data.created_at
    this.content = data.content
    this.id = data.id
    this.kind = data.kind
    this.pubkey = data.pubkey
    this.sig = data.sig
    this.tags = data.tags
  }

  public save(database: SQLite.Database, userPubKey: string) {
    if (this.isValid()) {
      try {
        if (this.kind === '0') {
          this.saveUserMeta(database)
        } else if (this.kind === '1' || this.kind === '2') {
          this.saveNote(database, userPubKey)
        } else if (this.kind === '3') {
          if (this.pubkey === userPubKey) {
            this.savePets(database)
          } else {
            this.saveFollower(database, userPubKey)
          }
        } else if (this.kind === '4') {
          this.saveDirectMessage(database)
        } else if (this.kind === '7') {
          this.saveReaction(database)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  protected isValid() {
    return this.id !== '' && this.sig !== ''
  }

  protected getMainEventId(): string | null {
    const eTags = this.filterTags('e')
    let mainEventId: string | null = null
    try {
      for (let i = 0; i < eTags.length; i++) {
        const tag = eTags[i]
        if (tag.length > 3 && tag[3] === 'root') {
          mainEventId = tag[1]
        }
      }
      if (mainEventId == null && eTags.length > 0) {
        mainEventId = eTags[0][1]
      }
    } catch (e) {
      console.error(e)
    }

    return mainEventId
  }

  protected getReplyEventId(): string | null {
    const eTags = this.filterTags('e')
    let replyEventId: string | null = null
    try {
      replyEventId = eTags[eTags.length - 1][1]
    } catch (e) {
      console.error(e)
    }

    return replyEventId
  }

  protected filterTags(kind: string): any[] {
    const filtered: any[] = []

    try {
      for (let i = 0; i < this.tags.length; i++) {
        const tag = this.tags[i]
        if (tag[0] === kind) {
          filtered.push(tag)
        }
      }
    } catch (e) {
      console.error(e)
    }

    return filtered
  }

  private saveUserMeta(database: SQLite.Database) {
    database.transaction((tx) => {
      tx.executeSql(
        'INSERT OR REPLACE INTO users (id, pubkey, username, description, following, followers, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          this.id,
          this.pubkey,
          this.content,
          this.tags[0],
          this.tags[1],
          this.tags[2],
          this.created_at,
        ],
        (_, result) => {
          console.log('Save user meta success', result)
        },
        (_, error: SQLite.SQLError) => {
          console.error('Save user meta error', error)
          return false
        }
      )
    })
  }

  private saveNote(database: SQLite.Database, userPubKey: string) {
    database.transaction((tx) => {
      tx.executeSql(
        'INSERT OR REPLACE INTO notes (id, pubkey, content, created_at, main_event_id, reply_event_id, user_mentioned) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          this.id,
          this.pubkey,
          this.content,
          this.created_at,
          this.getMainEventId(),
          this.getReplyEventId(),
          this.getUserMentioned(userPubKey) ? 1 : 0,
        ],
        (_, result) => {
          console.log('Save note success', result)
        },
        (_, error: SQLite.SQLError) => {
          console.error('Save note error', error)
          return false
        }
      )
    })
  }

  private savePets(database: SQLite.Database) {
    database.transaction((tx) => {
      tx.executeSql(
        'INSERT OR REPLACE INTO pets (id, pubkey, content, created_at, main_event_id) VALUES (?, ?, ?, ?, ?)',
        [this.id, this.pubkey, this.content, this.created_at, this.getMainEventId()],
        (_, result) => {
          console.log('Save pets success', result)
        },
        (_, error: SQLite.SQLError) => {
          console.error('Save pets error', error)
          return false
        }
      )
    })
  }

  private saveFollower(database: SQLite.Database, userPubKey: string) {
    database.transaction((tx) => {
      tx.executeSql(
        'INSERT OR REPLACE INTO followers (id, pubkey, content, created_at, main_event_id, user_mentioned) VALUES (?, ?, ?, ?, ?, ?)',
        [
          this.id,
          this.pubkey,
          this.content,
          this.created_at,
          this.getMainEventId(),
          this.getUserMentioned(userPubKey) ? 1 : 0,
        ],
        (_, result) => {
          console.log('Save follower success', result)
        },
        (_, error: SQLite.SQLError) => {
          console.error('Save follower error', error)
          return false
        }
      )
    })
  }

  private saveDirectMessage(database: SQLite.Database) {
    database.transaction((tx) => {
      tx.executeSql(
        'INSERT OR REPLACE INTO direct_messages (id, pubkey, content, created_at, reply_event_id) VALUES (?, ?, ?, ?, ?)',
        [this.id, this.pubkey, this.content, this.created_at, this.getReplyEventId()],
        (_, result) => {
          console.log('Save direct message success', result)
        },
        (_, error: SQLite.SQLError) => {
          console.error('Save direct message error', error)
          return false
        }
      )
    })
  }

  private saveReaction(database: SQLite.Database) {
    database.transaction((tx) => {
      tx.executeSql(
        'INSERT OR REPLACE INTO reactions (id, pubkey, event_id, reaction, created_at) VALUES (?, ?, ?, ?, ?)',
        [this.id, this.pubkey, this.tags[0], this.content, this.created_at],
        (_, result) => {
          console.log('Save reaction success', result)
        },
        (_, error: SQLite.SQLError) => {
          console.error('Save reaction error', error)
          return false
        }
      )
    })
  }

  protected getUserMentioned(userPubKey: string): boolean {
    const pTags = this.filterTags('p')
    let userMentioned = false
    try {
      for (let i = 0; i < pTags.length; i++) {
        const tag = pTags[i]
        if (tag[1] === userPubKey) {
          userMentioned = true
        }
      }
    } catch (e) {
      console.error(e)
      return false
    }

    return userMentioned
  }
}
