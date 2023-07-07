import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { IapScreen } from 'views/iap/IapScreen'
import { NavHeader } from 'views/shared'

export type OnboardingStackParams = {
  iap: undefined
}

const Stack = createNativeStackNavigator<OnboardingStackParams>()

export function OnboardingNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="iap"
      screenOptions={{
        header: ({ options }) => (
          <NavHeader options={options} title={options.title} />
        ),
      }}
    >
      <Stack.Screen
        name="iap"
        component={IapScreen}
        options={{ title: 'Firstload', headerShown: false }}
      />
    </Stack.Navigator>
  )
}
