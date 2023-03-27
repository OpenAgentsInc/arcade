import { createParam } from 'solito'
import { useNavigation } from '@react-navigation/native'
import { Trash2 } from '@tamagui/lucide-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { API_URL } from 'lib/api'
import { useStore } from 'stores/index'
import { Channel } from 'stores/types'
import { Button } from 'tamagui'

const { useParam } = createParam<{ channel: string }>()

export const LeaveChannelButton = () => {
  const apiToken = useStore((s) => s.apiToken)
  const { goBack } = useNavigation()
  const queryClient = useQueryClient()

  const [channelString] = useParam('channel')
  const channel =
    typeof channelString === 'string'
      ? JSON.parse(channelString)
      : channelString

  const mutation = useMutation({
    mutationFn: (channel: Channel) => {
      return axios.delete(`${API_URL}/api/channels/${channel.id}/join`, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      })
    },
    onSuccess: () => {
      console.log('Successfully left channel')
      queryClient.invalidateQueries({ queryKey: ['channels/true'] })
      queryClient.invalidateQueries({ queryKey: ['channels/false'] })
      goBack()
    },
  })

  const clickedLeaveChannel = () => {
    mutation.mutate(channel)
  }

  return (
    <Button
      backgrounded={false}
      circular
      onPress={clickedLeaveChannel}
      w="$3"
      mx={-10}
      outlineStyle={undefined}
      bg="transparent"
      pressStyle={{ backgrounded: false, backgroundColor: 'transparent' }}
      hoverStyle={{ backgrounded: false, backgroundColor: 'transparent' }}
      focusStyle={{ backgrounded: false, backgroundColor: 'transparent' }}
    >
      <Trash2 />
    </Button>
  )
}
