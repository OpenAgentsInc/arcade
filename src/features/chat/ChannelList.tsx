import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { Channel } from 'app/stores/chat'
import { useRef } from 'react'
import { Separator, Stack, Text } from 'tamagui'

import { ChannelPreview } from './ChannelPreview'
import { useChannels } from './useChannels'

export const ChannelList = () => {
  const channels = useChannels()
  const flashListRef = useRef<FlashList<Channel>>(null)

  const renderItem = ({ index }: ListRenderItemInfo<Channel>) => {
    const channel = channels[index]
    if (!channel) return <></>

    return (
      <ChannelPreview
        channel={channel}
        onPress={() =>
          console.log(
            `Clicked channel: ${channel.metadata.name} with picture: ${channel.metadata.picture}, ${channel.metadata.about}}`
          )
        }
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
