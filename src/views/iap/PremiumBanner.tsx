import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LinearGradient } from '@tamagui/linear-gradient'
import { ChevronRight, Gift } from '@tamagui/lucide-icons'
import { usePlan } from 'lib/hooks/usePlan'
import { haptic } from 'lib/utils/haptics'
import { Paragraph, Stack, XStack } from 'tamagui'

export const PremiumBanner = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<any>>() // StackNavigatorParams
  const plan = usePlan()
  if (plan) return <></>
  return (
    <Stack
      height={80}
      width="96%"
      onPress={() => {
        navigate('iap')
        haptic('medium')
      }}
      mx="$2"
    >
      <LinearGradient
        colors={['#324050', '#1B282B']}
        start={[1, 1]}
        end={[0, 0]}
        position="absolute"
        zIndex={-1}
        width="100%"
        px="$4"
        height="100%"
        borderRadius={20}
      />
      <XStack
        ai="center"
        justifyContent="space-evenly"
        zIndex={4}
        flex={1}
        mx="$3"
      >
        <Gift color="#C19541" />
        <Paragraph
          wordWrap="break-word"
          mx="$3"
          maxWidth={260}
          lineHeight="$1"
          color="#fff"
        >
          Try Faerie 3 days for free. Tap to activate premium.
        </Paragraph>
        <ChevronRight color="#C19541" />
      </XStack>
    </Stack>
  )
}
