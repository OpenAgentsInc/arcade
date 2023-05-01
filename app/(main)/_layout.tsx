import { Tabs } from 'expo-router'
import { useNostr } from 'lib/hooks'
import { useEffect } from 'react'
import { TabBar } from 'views/shared'
import { color, typography } from 'views/theme'

export default function MainLayout() {
  const nostr = useNostr()

  useEffect(() => {
    if (!nostr) return
    nostr.setupInitialSubscriptions()
  }, [nostr])

  return (
    <Tabs
      detachInactiveScreens={false}
      initialRouteName="channels"
      screenOptions={{
        headerStyle: {
          backgroundColor: color.palette.darkGray,
          elevation: 0,
          shadowColor: 'transparent',
        },
        headerTintColor: color.palette.white,
        headerTitleStyle: {
          fontFamily: typography.secondary,
        },
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="contacts"
        options={{
          href: '/contacts',
        }}
      />
      <Tabs.Screen
        name="channels"
        options={{
          href: '/channels',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: '/settings',
        }}
      />
    </Tabs>
  )
}
