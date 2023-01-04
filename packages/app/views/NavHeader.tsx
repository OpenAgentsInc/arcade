import { Paragraph, YStack } from '@my/ui'

export const NavHeader = ({ title }) => {
  return (
    <YStack
      p="$3"
      pt="$6"
      bg="$backgroundSoft"
      borderBottomColor="$backgroundStrong"
      borderBottomWidth="$1"
    >
      <Paragraph fontWeight="700" textAlign="center">
        {title}
      </Paragraph>
    </YStack>
  )
}
