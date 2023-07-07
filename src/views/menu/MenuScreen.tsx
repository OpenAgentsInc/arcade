import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  ChevronRight,
  Crown,
  RotateCcw,
  Scroll,
  Shield,
} from '@tamagui/lucide-icons'
import * as Linking from 'expo-linking'
import { usePlan } from 'lib/hooks/usePlan'
import { capitalize } from 'lib/utils'
import { restorePurchases } from 'lib/utils/iap'
import { MainStackParams } from 'navigation/MainNavigator'
import { useStore } from 'stores/index'
import { H4, ListItem, Separator, SheetHandle, YGroup, YStack } from 'tamagui'
import { PremiumBanner } from 'views/iap/PremiumBanner'

export const MenuScreen = () => {
  const plan = usePlan()
  const { navigate } =
    useNavigation<NativeStackNavigationProp<MainStackParams>>()
  const customerInfo = useStore((s) => s.customerInfo)
  const pressedYourPlan = () => {
    if (customerInfo.managementURL) {
      Linking.openURL(customerInfo.managementURL)
    } else {
      navigate('iap')
    }
  }
  return (
    <YStack backgroundColor="#000" f={1} p="$4">
      <SheetHandle />
      <PremiumBanner />
      <YStack mt="$6" space="$5">
        <H4 color="#98989E" letterSpacing={1}>
          SETTINGS
        </H4>
        <YGroup
          als="center"
          bordered
          size="$5"
          separator={<Separator />}
          w="100%"
          theme="dark"
        >
          <ListItem
            onPress={pressedYourPlan}
            size="$6"
            pressStyle={{ opacity: 0.8 }}
            title={`Your Plan${plan ? `: ${capitalize(plan)}` : ''}`}
            icon={Crown}
            iconAfter={ChevronRight}
          />
          <ListItem
            onPress={restorePurchases}
            size="$6"
            pressStyle={{ opacity: 0.8 }}
            title="Restore Purchases"
            icon={RotateCcw}
            iconAfter={ChevronRight}
          />
        </YGroup>
        <H4 color="#98989E" letterSpacing={1}>
          ABOUT
        </H4>
        <YGroup
          als="center"
          bordered
          size="$5"
          separator={<Separator />}
          w="100%"
          theme="dark"
        >
          <ListItem
            onPress={() => Linking.openURL('https://faerie.ai/terms')}
            size="$6"
            pressStyle={{ opacity: 0.8 }}
            title="Terms of Use"
            icon={Scroll}
            iconAfter={ChevronRight}
          />
          <ListItem
            onPress={() => Linking.openURL('https://faerie.ai/privacy')}
            size="$6"
            pressStyle={{ opacity: 0.8 }}
            title="Privacy Policy"
            icon={Shield}
            iconAfter={ChevronRight}
          />
        </YGroup>
      </YStack>
    </YStack>
  )
}
