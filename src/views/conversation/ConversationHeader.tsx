import { Separator, XStack, YStack } from 'tamagui'
import { BackButton } from 'views/shared'

import { TrashButton } from './TrashButton'

export const ConversationHeader = ({ conversationId }) => {
  return (
    <YStack>
      <XStack justifyContent="space-between" ai="center" mr="$3">
        <BackButton />
        <TrashButton conversationId={conversationId} />
        {/* <Share color="#636365" size={32} /> */}
      </XStack>
      <Separator borderColor="#181818" borderWidth={2} width="100%" mt="$1" />
    </YStack>
  )
}
