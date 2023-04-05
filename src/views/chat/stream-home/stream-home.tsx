import { useChatClient } from 'lib/hooks'
import {
  RootNavigatorParamList,
  StreamNavigatorParamList,
} from 'navigation/types'
import { useEffect } from 'react'
import { View } from 'react-native'
import { ChannelList } from 'stream-chat-expo'
import { Screen, Text } from 'views/shared'
import { color } from 'views/theme'
import { NavigationProp, useNavigation } from '@react-navigation/native'

const filters = { type: 'messaging' }
const sort = { last_message_at: -1 }

export const StreamHome = () => {
  const { clientIsReady } = useChatClient()

  // console.log(clientIsReady)

  const navigation = useNavigation<NavigationProp<StreamNavigatorParamList>>()
  useEffect(() => {
    navigation.setOptions({ title: 'Chatrooms' })
  }, [])

  if (!clientIsReady) {
    return (
      <Screen preset="fixedCenter">
        <Text text="Loading chat" preset="title" />
      </Screen>
    )
  }

  return (
    <View
      style={{ paddingTop: 0, flex: 1, backgroundColor: color.palette.black }}
    >
      <ChannelList
        filters={filters}
        onSelect={(channel) => {
          const channelData = extractChannelData(channel)
          // console.log(channelData)
          // console.log(channel)
          navigation.navigate('ChannelScreen', { channel: channelData })
        }}
        // sort={sort}
      />
    </View>
  )
}

const extractChannelData = (channel) => {
  return {
    channelId: channel.id,
    channelType: channel.type,
  }
}
