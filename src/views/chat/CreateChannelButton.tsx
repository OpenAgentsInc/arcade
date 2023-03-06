import { Plus } from '@tamagui/lucide-icons'
import { Button } from 'tamagui'

export const CreateChannelButton = () => {
  const clickedCreateChannel = () => {
    console.log('clicked create channel')
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
