import { createParam } from 'solito'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { Screen } from '@my/ui/src'
import { MessageInput, MessageList } from '../components'

const { useParam } = createParam<{ channel: string }>()

export const ChannelScreen = ({ navigation, route }) => {
  const { setOptions } = useNavigation()
  const [channelString] = useParam('channel')
  const channel = JSON.parse(channelString as string)

  useEffect(() => {
    setOptions({ title: channel?.title ?? 'Unnamed Channel' })
  }, [channel])

  if (!channel)
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    )
  return (
    <Screen>
      <MessageList channel={channel} />
      <MessageInput channel={channel} />
    </Screen>
  )
}
