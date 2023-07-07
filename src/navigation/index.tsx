import { useOnboarded } from 'lib/hooks'
import { View } from 'react-native'

import { MainNavigator } from './MainNavigator'
import { OnboardingNavigator } from './OnboardingNavigator'

export function NativeNavigation() {
  const onboarded = useOnboarded()
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {onboarded ? <MainNavigator /> : <OnboardingNavigator />}
    </View>
  )
}
