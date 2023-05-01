import { useRef } from 'react'
import { Channel } from 'stores/chat'
import { Separator } from 'tamagui'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { ChannelPreview } from './ChannelPreview'
import { useChannels } from './useChannels'
import { useRouter } from 'expo-router'

export const ChannelList = () => {
  const router = useRouter()
  const channels = useChannels()

  const flashListRef = useRef<FlashList<Channel>>(null)

  const renderItem = ({ index }: ListRenderItemInfo<Channel>) => {
    const channel = channels[index]
    if (!channel) return <></>

    return (
      <ChannelPreview
        channel={channel}
        onPress={() => {
          console.log(
            `Clicked channel: ${channel.metadata.name} with picture: ${channel.metadata.picture}, ${channel.metadata.about}}`
          )
          router.push({
            pathname: '/home/channels/[id]',
            params: { id: channel.id, name: channel.metadata.name },
          })
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
