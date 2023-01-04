import { Paragraph, XStack, YStack } from '@my/ui'
import { ChevronLeft, Settings } from '@tamagui/lucide-icons'

export const NavHeader = ({ title }) => {
  return (
    <YStack
      p="$3"
      pt="$6"
      bg="$backgroundSoft"
      borderBottomColor="$backgroundStrong"
      borderBottomWidth="$1"
    >
      <XStack w="100%" justifyContent="space-between">
        <ChevronLeft />
        <Paragraph fontWeight="700" textAlign="center">
          {title}
        </Paragraph>
        <Settings />
      </XStack>
    </YStack>
  )
}
