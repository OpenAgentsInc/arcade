import { Tabs } from 'expo-router'
import { Globe, MessageCircle, Settings } from '@tamagui/lucide-icons'
import { XStack } from 'tamagui'
import { NavHeader } from '@my/ui/src'

const activeTabColor = '$color12'
const inactiveTabColor = '$color8'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarStyle: {
          borderTopWidth: 0,
        },
        tabBarBackground: () => (
          <XStack
            f={1}
            backgroundColor="$color1"
            borderTopWidth="$1"
            borderTopColor="$color4"
            elevation="$6"
          />
        ),
      }}
    >
      <Tabs.Screen
        name="chat"
        // TODO: Type
        options={({ navigation }): any => ({
          title: 'Tab One',
          tabBarIcon: ({ focused, size }) => (
            <MessageCircle
              color={focused ? activeTabColor : inactiveTabColor}
              size={size}
            />
          ),
        })}
      />
      <Tabs.Screen
        name="discover"
        options={{
          headerShown: true,
          title: 'Discover',
          header: ({ options }) => (
            <NavHeader
              options={options}
              title={options.title}
              // rightButton={<CreateChannelButton />}
            />
          ),
          tabBarIcon: ({ focused, size }) => (
            <Globe
              color={focused ? activeTabColor : inactiveTabColor}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: true,
          title: 'Settings',
          tabBarIcon: ({ focused, size }) => (
            <Settings
              color={focused ? activeTabColor : inactiveTabColor}
              size={size}
            />
          ),
          header: ({ options }) => (
            <NavHeader options={options} title={options.title} />
          ),
        }}
      />
    </Tabs>
  )
}

//
