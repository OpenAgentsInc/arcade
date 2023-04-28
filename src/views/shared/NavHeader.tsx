import { Button, Paragraph, Stack, XStack, YStack } from 'tamagui'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeft, Settings } from '@tamagui/lucide-icons'

export const NavHeader = ({ title, options, ...props }) => {
  const { canGoBack, goBack } = useNavigation()
  const { name } = useRoute()

  return (
    <YStack
      elevation="$3"
      px="$3"
      pt="$8"
      bg="$color1"
      borderBottomColor="$color4"
      borderBottomWidth="$1"
    >
      <XStack w="100%" justifyContent="space-between" alignItems="center">
        {canGoBack() && name !== 'tabs' ? (
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
          <Stack w="$1" h="$4" />
        )}

        <Paragraph fontWeight="700" textAlign="center" color="$color12">
          {options?.title ?? title}
        </Paragraph>

        {/* If current title is not Settings */}
        {name !== 'settifsdfsdngs' ? (
          <Stack w="$1" />
        ) : (
          <Button
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
