import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useUser } from 'lib/hooks'
import { ConversationScreen } from 'views/conversation/ConversationScreen'
import { HistoryScreen } from 'views/home/HistoryScreen'
import { HomeScreen } from 'views/home/HomeScreen'
import { IapScreen } from 'views/iap/IapScreen'
import { MenuScreen } from 'views/menu/MenuScreen'

export type MainStackParams = {
  home: undefined
  history: undefined
  conversation: { conversationId: string; conversationType: string }
  iap: undefined
  menu: undefined
}

const Stack = createNativeStackNavigator<MainStackParams>()

export function MainNavigator() {
  const { loading, userId } = useUser()
  if (loading || !userId) return null
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="history" component={HistoryScreen} />
      <Stack.Screen name="conversation" component={ConversationScreen} />
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
        }}
      >
        <Stack.Screen name="iap" component={IapScreen} />
        <Stack.Screen name="menu" component={MenuScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}
