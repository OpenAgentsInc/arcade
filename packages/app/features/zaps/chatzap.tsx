import { Stack, Theme, YStack } from 'tamagui'
import { Message } from '@my/ui/src/components/Message'
import { RUNNING_ARC_MESSAGE } from 'app/lib/nostr'

export const ChatZapScreen = () => {
  return (
    <Theme name="dark">
      <Theme name="blue">
        <YStack f={1} bc="$blue2Dark" ai="center">
          <Stack mt="$12" width={350} minHeight={60}>
            <Message currentUser="asdf1234" message={RUNNING_ARC_MESSAGE} />
          </Stack>
        </YStack>
      </Theme>
    </Theme>
  )
}
