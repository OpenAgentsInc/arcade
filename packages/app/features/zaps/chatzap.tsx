import { useEffect } from 'react'
import { Stack, Theme, YStack } from 'tamagui'
import { Message } from '@my/ui/src/components/Message'
import { checkRelayForEvent, RUNNING_ARC_MESSAGE } from 'app/lib/nostr'

export const ChatZapScreen = () => {
  //   useEffect(() => {
  //     checkRelayForEvent(
  //       '32e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245',
  //       'wss://relay.damus.io'
  //     )
  //   }, [])
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
