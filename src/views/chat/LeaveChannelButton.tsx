import { Settings } from '@tamagui/lucide-icons'
import { Button } from 'tamagui'

export const LeaveChannelButton = () => {
  return (
    <Button
      backgrounded={false}
      circular
      w="$3"
      mx={-10}
      outlineStyle={undefined}
      bg="transparent"
      pressStyle={{ backgrounded: false, backgroundColor: 'transparent' }}
      hoverStyle={{ backgrounded: false, backgroundColor: 'transparent' }}
      focusStyle={{ backgrounded: false, backgroundColor: 'transparent' }}
    >
      <Settings />
    </Button>
  )
}
