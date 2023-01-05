import { useLink } from 'solito/link'
import { Button, Paragraph, Stack, XStack, YStack } from '@my/ui'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeft, Settings } from '@tamagui/lucide-icons'

export const NavHeader = ({ title, options, ...props }) => {
  const linkprops = useLink({ href: '/settings' })
  const { canGoBack, goBack } = useNavigation()
  const { name } = useRoute()
  return (
    <YStack
      elevation="$3"
      px="$3"
      pt="$6"
      bg="$color1"
      borderBottomColor="$color5"
      borderBottomWidth="$0.5"
    >
      <XStack w="100%" justifyContent="space-between" alignItems="center">
        {canGoBack() ? (
          <Button
            onPress={() => goBack()}
            backgrounded={false}
            circular
            w="$3"
            mx={-10}
            outlineStyle={undefined}
            pressStyle={{ backgrounded: false, backgroundColor: 'transparent' }}
            hoverStyle={{ backgrounded: false, backgroundColor: 'transparent' }}
            focusStyle={{ backgrounded: false, backgroundColor: 'transparent' }}
          >
            <ChevronLeft />
          </Button>
        ) : (
          <Stack w="$1" />
        )}

        <Paragraph fontWeight="700" textAlign="center" color="$color12">
          {options?.title ?? title}
        </Paragraph>
        {/* If current title is not Settings */}
        {name === 'settings' ? (
          <Stack w="$1" />
        ) : (
          <Button
            {...linkprops}
            backgrounded={false}
            circular
            w="$3"
            mx={-10}
            outlineStyle={undefined}
            pressStyle={{ backgrounded: false, backgroundColor: 'transparent' }}
            hoverStyle={{ backgrounded: false, backgroundColor: 'transparent' }}
            focusStyle={{ backgrounded: false, backgroundColor: 'transparent' }}
          >
            <Settings />
          </Button>
        )}
      </XStack>
    </YStack>
  )
}
