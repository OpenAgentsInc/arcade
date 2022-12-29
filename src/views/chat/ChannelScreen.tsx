import { RootStackScreenProps } from 'navigation/types'
import { useEffect } from 'react'
import { Screen } from 'views/shared'
import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'

export const ChannelScreen = ({ navigation, route }: RootStackScreenProps<'channel'>) => {
  const title = route.params.name
  useEffect(() => {
    navigation.setOptions({ title })
  }, [title])
  return (
    <Screen preset='fixed' unsafe>
      <MessageList />
      <MessageInput channelId={route.params.id} />
    </Screen>
  )
}
