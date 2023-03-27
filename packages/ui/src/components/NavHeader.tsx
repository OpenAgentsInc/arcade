import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { Platform } from 'react-native'
import { Button, Paragraph, Stack, XStack, YStack } from 'tamagui'

interface NavHeaderProps {
  title?: string
  rightButton?: React.ReactNode
  options?: any
}

export const NavHeader = ({
  title,
  rightButton = undefined,
  options,
}: NavHeaderProps) => {
  const { canGoBack, goBack } = useNavigation()
  const { name } = useRoute()

  return (
    <YStack
      elevation="$3"
      px="$3"
      pt={Platform.OS === 'ios' ? '$8' : '$4'}
      bg="$color1"
      borderBottomColor="$color4"
      borderBottomWidth="$1"
    >
      <XStack w="100%" justifyContent="space-between" alignItems="center">
        {canGoBack() && name !== 'tabs' ? (
          <Button
            onPress={() => goBack()}
            backgrounded={false}
            backgroundColor="transparent"
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

        {rightButton ?? <Stack w="$1" />}
        {/*
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
        )} */}
      </XStack>
    </YStack>
  )
}
