import { useNavigation } from '@react-navigation/native'
import { Plus } from '@tamagui/lucide-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { generateRandomPlacekitten } from 'lib/utils'
import { useStore } from 'stores/index'
import { Channel } from 'stores/types'
import { Button } from 'tamagui'

export const CreateChannelButton = () => {
  const apiToken = useStore((s) => s.apiToken)
  const { goBack } = useNavigation()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (channel: Channel) => {
      return axios.post(
        `http://localhost:8000/api/channels/`,
        { ...channel },
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      )
    },
    onSuccess: () => {
      console.log('Successfully created channel')
      queryClient.invalidateQueries({ queryKey: ['channels/true'] })
      queryClient.invalidateQueries({ queryKey: ['channels/false'] })
      goBack()
    },
  })

  const clickedCreateChannel = () => {
    console.log('clicked create channel')
    mutation.mutate({
      id: '0',
      about: 'New Channel Description',
      title: 'New Channel',
      picture: generateRandomPlacekitten(),
    })
  }
  return (
    <Button
      backgrounded={false}
      circular
      onPress={clickedCreateChannel}
      w="$3"
      mx={-10}
      outlineStyle={undefined}
      bg="transparent"
      pressStyle={{ backgrounded: false, backgroundColor: 'transparent' }}
      hoverStyle={{ backgrounded: false, backgroundColor: 'transparent' }}
      focusStyle={{ backgrounded: false, backgroundColor: 'transparent' }}
    >
      <Plus />
    </Button>
  )
}
