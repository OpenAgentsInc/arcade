import { DirectMessage } from 'app/stores/eventTypes'
import { Text, XStack } from 'tamagui'

export const DmPreview = ({
  conversation,
}: {
  conversation: DirectMessage
}) => {
  const { pubkey } = conversation
  return (
    <XStack p="$3">
      <Text color="$color10">{pubkey}</Text>
    </XStack>
  )
}
