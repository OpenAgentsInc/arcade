import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { StackNavigatorParams } from 'app/@types/navigation'
import { useRef } from 'react'
import { Channel } from 'stores/eventTypes'
import { Separator } from 'tamagui'

import { ChannelPreview } from './ChannelPreview'
import { useChannels } from './useChannels'

export const ChannelList = () => {
  const channels = useChannels()
  const flashListRef = useRef<FlashList<Channel>>(null)
  const { navigate } =
    useNavigation<NativeStackNavigationProp<StackNavigatorParams>>()

  const renderItem = ({ index }: ListRenderItemInfo<Channel>) => {
    const channel = channels[index]
    if (!channel) return <></>

    return (
      <ChannelPreview
        channel={channel}
        onPress={() => {
          console.log(
            `Clicked channel: ${channel.name} with picture: ${channel.picture}, ${channel.about}}`
          )
          navigate('channel', { channel })
        }}
      />
    )
  }

  return (
    <FlashList
      ref={flashListRef}
      renderItem={renderItem}
      estimatedItemSize={150}
      data={channels}
      ItemSeparatorComponent={() => (
        <Separator borderColor="$color4" borderWidth={0.5} />
      )}
    />
  )
}
