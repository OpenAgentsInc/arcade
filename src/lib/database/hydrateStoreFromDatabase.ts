import { useStore } from 'app/stores'
import * as SQLite from 'expo-sqlite'
import { db } from 'lib/database'
import { Channel, ChannelMessage, Note, User } from 'stores/eventTypes'

export const hydrateStoreFromDatabase = async () => {
  const { addUser, addNote, addChannel, addChannelMessage } =
    useStore.getState()

  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM arc_users',
      [],
      (_, { rows: { _array } }) => {
        _array.forEach((user) => {
          console.log('trying to add user:', user)
          addUser(user)
        })
      },
      (_, error) => {
        console.log('Error querying arc_users', error)
        return false
      }
    )

    tx.executeSql(
      'SELECT * FROM arc_notes',
      [],
      (_, { rows: { _array } }) => {
        _array.forEach((note) => {
          console.log('trying to add note:', note)
          addNote(note)
        })
      },
      (_, error) => {
        console.log('Error querying arc_notes', error)
        return false
      }
    )

    tx.executeSql(
      'SELECT * FROM arc_channels',
      [],
      (_, { rows: { _array } }) => {
        _array.forEach((channel) => {
          addChannel(channel)
        })
      },
      (_, error) => {
        console.log('Error querying arc_channels', error)
        return false
      }
    )

    tx.executeSql(
      'SELECT * FROM arc_channel_messages',
      [],
      (_, { rows: { _array } }) => {
        _array.forEach((channelMessage) => {
          addChannelMessage(channelMessage)
        })
      }
    )
  })
}
