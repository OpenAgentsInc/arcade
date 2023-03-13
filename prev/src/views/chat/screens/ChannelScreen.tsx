import { RouteProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackNavigatorParams } from 'navigation/nav-types'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { Screen } from 'views/shared'

import { MessageInput, MessageList } from '../components'

type ChannelScreenProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, 'channel'>
  route: RouteProp<StackNavigatorParams, 'channel'>
}

export const ChannelScreen = ({ navigation, route }: ChannelScreenProps) => {
  const { channel } = route.params
  const { setOptions } = useNavigation()

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
