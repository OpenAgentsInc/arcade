import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { API_URL } from 'lib/api'
import { StackNavigatorParams } from 'navigation/nav-types'
import { useRef } from 'react'
import { useStore } from 'stores/index'
import { Channel } from 'stores/types'
import { Separator } from 'tamagui'

import { useChannels } from '../hooks'
import { ChannelPreview } from './ChannelPreview'

export const ChannelList = ({ joined }) => {
  const channels = useChannels(joined).filter(
    (c: Channel) =>
      c.relayurl !== 'wss://nostr.developer.li' &&
      // and name isn't channel name
      c.title !== 'channel name'
  ) as Channel[]
  const queryClient = useQueryClient()
  const flashListRef = useRef<FlashList<Channel>>(null)
  const { navigate } =
    useNavigation<NativeStackNavigationProp<StackNavigatorParams>>()

  const apiToken = useStore((s) => s.apiToken)

  const mutation = useMutation({
    mutationFn: (channel: Channel) => {
      return axios.post(
        `${API_URL}/api/channels/${channel.id}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      )
    },
    onSuccess: (_, channel) => {
      console.log('Successfully joined channel')
      queryClient.invalidateQueries({ queryKey: ['channels/true'] })
      queryClient.invalidateQueries({ queryKey: ['channels/false'] })
      navigate('channel', { channel })
    },
  })

  const renderItem = ({ index }: ListRenderItemInfo<Channel>) => {
    const channel = channels[index]
    if (!channel) return <></>

    return (
      <ChannelPreview
        channel={channel}
        onPress={() => {
          if (joined) {
            navigate('channel', { channel })
          } else {
            mutation.mutate(channel)
          }
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
