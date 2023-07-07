import { Share } from '@tamagui/lucide-icons'
import { Button, YStack } from 'tamagui'

export const ShareButton = ({ onPress }) => {
  return (
    <YStack p="$5" pb="$7" backgroundColor="#000">
      <Button
        backgroundColor="#43A081"
        color="#fff"
        size="$6"
        fontWeight="700"
        iconAfter={Share}
        onPress={onPress}
        pressStyle={{ opacity: 0.8 }}
      >
        Share
      </Button>
    </YStack>
  )
}
