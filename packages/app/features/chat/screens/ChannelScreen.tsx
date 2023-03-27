import { createParam } from 'solito'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
// import { StackNavigatorParams } from 'navigation/nav-types'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { Screen } from '@my/ui/src'

import { MessageInput, MessageList } from '../components'

// type ChannelScreenProps = {
//   navigation: NativeStackNavigationProp<StackNavigatorParams, 'channel'>
//   route: RouteProp<StackNavigatorParams, 'channel'>
// }

const { useParam } = createParam<{ channel: string }>()

export const ChannelScreen = ({ navigation, route }) => {
  //   const { channel } = route.params
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
