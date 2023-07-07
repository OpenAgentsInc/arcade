import { Spinner, Theme, YStack } from 'tamagui'

export const ConversationLoading = () => (
  <Theme name="dark">
    <YStack jc="center" ai="center" space="$3" py="$5">
      <Spinner size="large" />
    </YStack>
  </Theme>
)
