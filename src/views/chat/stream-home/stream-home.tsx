import { useChatClient } from 'lib/hooks'
import { StreamNavigatorParamList } from 'navigation/types'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { ChannelList } from 'stream-chat-expo'
import { Screen, Text } from 'views/shared'
import { color } from 'views/theme'
import { NavigationProp, useNavigation } from '@react-navigation/native'

const filters = { type: 'messaging' }
const sort = { last_message_at: -1 }

export const StreamHome = () => {
  const { clientIsReady } = useChatClient()

  const navigation = useNavigation<NavigationProp<StreamNavigatorParamList>>()
  useEffect(() => {
    navigation.setOptions({ title: 'Chatrooms' })
  }, [])

  if (!clientIsReady) {
    return (
      <Screen preset="fixedCenter">
        <ActivityIndicator size="large" color={color.palette.arwesSecondary} />
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
