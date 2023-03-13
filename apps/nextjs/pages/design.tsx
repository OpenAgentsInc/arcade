import { Message } from '@my/ui/src/components/Message'
import { ChannelMessage } from '@my/ui/src/types'
import { Stack, Theme, YStack } from 'tamagui'

export default function DesignPage() {
  const message: ChannelMessage = {
    id: '123',
    pubkey: 'asdf1234',
    content: 'Hello world',
    created_at: 1678567890,
  }
  return (
    <Theme name="green">
      <YStack f={1} bc="$blue2Dark" jc="center" ai="center">
        <Stack>
          <Message currentUser="asdf1234" message={message} />
        </Stack>
      </YStack>
    </Theme>
  )
}
