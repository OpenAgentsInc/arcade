import { Tabs } from 'expo-router'
import { useColorScheme } from 'react-native'
import { Globe, MessageCircle, Settings } from '@tamagui/lucide-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { XStack } from 'tamagui'
import { NavHeader } from '@my/ui/src'

const activeTabColor = '$color12'
const inactiveTabColor = '$color8'

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const colorScheme = useColorScheme()

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
            backgroundColor="$backgroundSoft"
            borderTopWidth="$1"
            borderTopColor="$color4"
            elevation="$6"
          />
        ),
      }}
      //   screenOptions={{
      //     tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      //   }}
    >
      <Tabs.Screen
        name="index"
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
        name="two"
        options={{
          title: 'Tab Two',
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
