import { Stack, Theme, YStack } from 'tamagui'
import { ChannelMessage } from '../types'
import { Message } from './Message'

export const DesignShowcase = () => {
  const message: ChannelMessage = {
    id: '123',
    pubkey: 'asdf1234',
    content: 'Hello world',
    sats_zapped: 1337,
    created_at: 1678567890,
  }
  return (
    <Theme name="dark">
      <Theme name="blue">
        <YStack f={1} bc="$blue2Dark" ai="center">
          <Stack mt="$12" width={350} minHeight={60}>
            <Message currentUser="asdf1234" message={message} />
          </Stack>
        </YStack>
      </Theme>
    </Theme>
  )
}
