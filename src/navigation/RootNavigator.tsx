/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your MainNavigator) which the user
 * will use once logged in.
 *
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

import { chatClient, useStreamChatTheme } from 'lib/hooks'
import { Chat, OverlayProvider } from 'stream-chat-expo'
import { SplashScreen } from 'views/splash/SplashScreen'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './navigation-utilities'
import { RootStack } from './RootStack'
import { NavigationProps } from './types'

export const RootNavigator = (props: NavigationProps) => {
  const authed = false
  const theme = useStreamChatTheme()
  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <OverlayProvider value={{ style: theme }}>
        <Chat client={chatClient}>
          {authed ? <RootStack /> : <SplashScreen />}
        </Chat>
      </OverlayProvider>
    </NavigationContainer>
  )
}
