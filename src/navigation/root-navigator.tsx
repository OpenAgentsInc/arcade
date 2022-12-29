import { useNostr } from 'lib/hooks'
import React from 'react'
// import NotFoundScreen from 'views/error/NotFoundScreen'
// import ModalScreen from 'views/modal/ModalScreen'
// import { NewRequestScreen } from 'views/ride/NewRequestScreen'
// import { RequestBegin, RequestConfirm } from 'views/service'
import { color, typography } from 'views/theme'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BottomTabNavigator } from './tab-navigator'
import { RootStackParamList } from './types'

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootNavigator() {
  useNostr()
  return (
    <Stack.Navigator>
      <Stack.Screen name='Root' component={BottomTabNavigator} options={{ headerShown: false }} />
      {/* <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name='RequestBegin'
          component={RequestBegin}
          options={{ ...modalOptions, title: 'New Request' }}
        />
        <Stack.Screen
          name='RequestConfirm'
          component={RequestConfirm}
          options={{ ...modalOptions, title: 'Confirm Request' }}
        />
        <Stack.Screen
          name='NewRequest'
          component={NewRequestScreen}
          options={{ ...modalOptions, title: 'New Request' }}
        />
        <Stack.Screen
          name='Modal'
          component={ModalScreen}
          options={{ ...modalOptions, title: 'Info' }}
        />
      </Stack.Group> */}
    </Stack.Navigator>
  )
}

const modalOptions = {
  headerStyle: {
    backgroundColor: color.tabbar,
  },
  headerTitleStyle: {
    color: color.text,
    fontFamily: typography.secondary,
  },
}
