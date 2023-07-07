import { usePlan } from 'lib/hooks/usePlan'
import { YStack } from 'tamagui'
import { PremiumBanner } from 'views/iap/PremiumBanner'
import { SolidScreen } from 'views/shared'

import { BottomActions } from './BottomActions'
import { HistoryCarousel } from './HistoryCarousel'
import { HomeHeader } from './HomeHeader'

export const HomeScreen = () => {
  const plan = usePlan()
  console.log('Plan:', plan)
  return (
    <SolidScreen>
      <YStack w="100%" flexGrow={1}>
        <HomeHeader />
        <PremiumBanner />
        <HistoryCarousel />
      </YStack>
      <BottomActions />
    </SolidScreen>
  )
}
