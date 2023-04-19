import { ReceiveZapScreen } from 'views/wallet/ReceiveZapScreen'
import { SendZapScreen } from 'views/wallet/SendZapScreen'
import { ShareAndEarnScreen } from 'views/wallet/ShareAndEarnScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export const WalletNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="WalletScreen">
      <Stack.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={{ title: 'Wallet' }}
      />
      <Stack.Screen
        name="SendZapScreen"
        component={SendZapScreen}
        options={{ title: 'Send Zap' }}
      />
      <Stack.Screen
        name="ReceiveZapScreen"
        component={ReceiveZapScreen}
        options={{ title: 'Receive Zap' }}
      />
      <Stack.Screen
        name="ShareAndEarnScreen"
        component={ShareAndEarnScreen}
        options={{ title: 'Share and Earn' }}
      />
    </Stack.Navigator>
  )
}
