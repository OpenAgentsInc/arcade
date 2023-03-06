import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { StackNavigatorParams } from 'navigation/nav-types'
import { useRef } from 'react'
import { useStore } from 'stores/index'
import { Channel } from 'stores/types'
import { Separator } from 'tamagui'

import { ChannelPreview } from './ChannelPreview'
import { useChannels } from './useChannels'

export const ChannelList = ({ joined }) => {
  const channels = useChannels(joined) as Channel[]
  const queryClient = useQueryClient()
  const flashListRef = useRef<FlashList<Channel>>(null)
  const { navigate } =
    useNavigation<NativeStackNavigationProp<StackNavigatorParams>>()

  const apiToken = useStore((s) => s.apiToken)

  const mutation = useMutation({
    mutationFn: ({ id }) => {
      console.log('Attempting API call with id:', id)
      console.log('and api tokeN:', apiToken)
      return axios.post(
        `http://localhost:8000/api/channels/${id}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      )
    },
    onSuccess: () => {
      console.log('Successfully joined channel')
      queryClient.invalidateQueries({ queryKey: ['channels/true'] })
      queryClient.invalidateQueries({ queryKey: ['channels/false'] })
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
            mutation.mutate({ id: channel.id })
            console.log('Lets join this channel')
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
