import { saveNewChannelMessage } from 'lib/nostr/saveNewChannelMessage'
import { delay } from 'lib/utils'
import { RefObject } from 'react'
import { Alert, TextInput } from 'react-native'
import { useStore } from 'stores/index'
import { Channel } from 'stores/types'

export const sendMessage = async (
  channel: Channel,
  text: string,
  setText: (text: string) => void,
  inputBoxRef: RefObject<TextInput>
) => {
  const { publicKey, privateKey } = useStore.getState().user
  console.log('Sending a message to channel:', channel.title, channel)
  if (text.length < 1) {
    Alert.alert('Message too short', 'What is that, a message for ants?')
    return
  }
  inputBoxRef.current?.clear()
  inputBoxRef.current?.blur()
  setText('')
  await delay(100)
  const { eventid } = await saveNewChannelMessage({
    channel,
    publicKey,
    privateKey,
    text,
  })

  console.log(eventid)
}
