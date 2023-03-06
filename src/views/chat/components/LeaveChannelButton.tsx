import { useNavigation, useRoute } from '@react-navigation/native'
import { Trash2 } from '@tamagui/lucide-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useStore } from 'stores/index'
import { Channel } from 'stores/types'
import { Button } from 'tamagui'

export const LeaveChannelButton = () => {
  const apiToken = useStore((s) => s.apiToken)
  const route = useRoute<any>()
  const { goBack } = useNavigation()
  const channel = route.params?.channel as Channel
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (channel: Channel) => {
      return axios.delete(
        `http://localhost:8000/api/channels/${channel.id}/join`,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      )
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
