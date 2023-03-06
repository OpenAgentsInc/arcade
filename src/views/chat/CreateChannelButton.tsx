import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Plus } from '@tamagui/lucide-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { generateRandomPlacekitten } from 'lib/utils'
import { StackNavigatorParams } from 'navigation/nav-types'
import { useStore } from 'stores/index'
import { Channel } from 'stores/types'
import { Button } from 'tamagui'

export const CreateChannelButton = () => {
  const apiToken = useStore((s) => s.apiToken)
  const { goBack } = useNavigation()
  const queryClient = useQueryClient()
  const { navigate } =
    useNavigation<NativeStackNavigationProp<StackNavigatorParams>>()

  const mutation = useMutation({
    mutationFn: (channel: Channel) => {
      const eventid = `1234556 ${Math.random()}`
      const relayurl = 'wss://fakerelay.io'

      return axios.post(
        `http://localhost:8000/api/channels/`,
        { ...channel, eventid, relayurl },
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      )
    },
    onSuccess: (_, channel) => {
      console.log('Successfully created channel')
      queryClient.invalidateQueries({ queryKey: ['channels/true'] })
      queryClient.invalidateQueries({ queryKey: ['channels/false'] })
      navigate('channel', { channel })
    },
  })

  const clickedCreateChannel = () => {
    console.log('clicked create channel')
    mutation.mutate({
      id: '0',
      about: 'New Channel Description',
      title: `New Channel ${Math.random()}`,
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
