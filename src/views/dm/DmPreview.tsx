import { DirectMessage } from 'app/stores/eventTypes'
import { Text, XStack } from 'tamagui'

export const DmPreview = ({
  conversation,
}: {
  conversation: DirectMessage
}) => {
  console.log(conversation.pubkey)
  return (
    <XStack p="$2">
      <Text color="$color10">ehehehehehhe</Text>
    </XStack>
  )
}
